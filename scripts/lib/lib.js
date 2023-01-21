import { Constants } from "./Constants.js";
import { getSetting } from "./settings.js";

function log(message) {
  console.log(
    `%c${Constants.moduleName}%c | ` + message,
    "color:#efc160",
    "color:#bbbbbb"
  );
}

class KelsUtilities {
  constructor() {
    return (async () => {
      this.Constants = Constants;
      this.log = log;

      this.monsterResources = await fetch(
        Constants.pathJsonMonsterResources
      ).then((response) => response.json());

      this.hooksTurnIntoItemPiles = new Map();
      this.hooksShowMonsterArtwork = new Map();
      this.hooksOpenMonsterStatblock = new Map();

      return this;
    })();
  }

  isModuleActive(moduleName) {
    return Boolean(game.modules.get(moduleName)?.active);
  }

  monsterArtworkUrl(monsterName) {
    if (!(monsterName in this.monsterResources)) {
      log(`"${monsterName}" monster name was not found in monster resources!`);

      return null;
    }

    return this.monsterResources[monsterName].image_url;
  }

  monsterStatblockUrl(monsterName) {
    if (!(monsterName in this.monsterResources)) {
      log(`"${monsterName}" monster name was not found in monster resources!`);

      return null;
    }

    return this.monsterResources[monsterName].statblock_url;
  }

  tableResultToEquipmentQuality(tableResult) {
    const range = tableResult.results[0].range;

    for (const equipmentQuality of Constants.equipmentQuality) {
      if (equipmentQuality.range.toString() == range.toString()) {
        return equipmentQuality;
      }
    }
  }

  async modifyTokenEquipementQuality(token) {
    let gmState = null;
    if (this.isModuleActive("df-manual-rolls")) {
      gmState = game.settings.get("df-manual-rolls", "gm");
      if (gmState !== "disabled")
        await game.settings.set("df-manual-rolls", "pc", "disabled");
    }

    const pack = `${Constants.moduleName}.${Constants.packs.rollTables}`;
    const tableEquipmentQuality = await game.packs
      .get(pack)
      .getDocument(Constants.rolltableIds.equipmentQuality);

    for (let item of token.actor.items) {
      log(`Updating ${item}`);
      const results = await tableEquipmentQuality.roll();
      const equipmentQuality = this.tableResultToEquipmentQuality(results);

      if (item.system.price?.value != undefined) {
        await item.update({
          name: item.name + " " + "(" + equipmentQuality.name + ")",
          "system.price.value":
            item.system.price.value * equipmentQuality.priceMultiplier,
        });
      }
    }

    if (this.isModuleActive("df-manual-rolls")) {
      await game.settings.set("df-manual-rolls", "pc", gmState);
    }
  }

  async registerHooksTurnIntoItemPiles() {
    log('Registering "TurnIntoItemPiles" hooks...');

    let hookName = "item-piles-turnIntoItemPiles";
    this.hooksTurnIntoItemPiles.set(
      hookName,
      Hooks.on(hookName, async (tokenUpdateGroups, actorUpdateGroups) => {
        for (let [key, tokenUpdates] of Object.entries(tokenUpdateGroups)) {
          for (let tokenUpdate of tokenUpdates) {
            let token = canvas.tokens.placeables.filter(
              (token) => token.document._id == tokenUpdate._id
            )[0];

            this.modifyTokenEquipementQuality(token);
          }
        }
      })
    );

    return this.hooksTurnIntoItemPiles;
  }

  async unregisterHooksTurnIntoItemPiles() {
    log('Unregistering "TurnIntoItemPiles" hooks...');

    for (let [key, hook] of this.hooksTurnIntoItemPiles.entries()) {
      log(`Unregistering ${key} with ${hook} id.`);
      Hooks.off(key, hook);
    }

    this.hooksTurnIntoItemPiles = new Map();

    return this.hooksTurnIntoItemPiles;
  }

  async registerHooksShowMonsterArtwork() {
    log('Registering "ShowMonsterArtwork" hooks...');

    let hookName = "getActorSheetHeaderButtons";
    this.hooksShowMonsterArtwork.set(
      hookName,
      Hooks.on(hookName, (actorSheet, buttons) => {
        if (!game.user.isGM) {
          return;
        }

        const monsterName = game.actors.get(actorSheet.object._id).name;
        const monsterArtworkUrl = this.monsterArtworkUrl(monsterName);

        if (monsterArtworkUrl == null) {
          return;
        }

        buttons.unshift({
          label: "Artwork",
          icon: "fa-solid fa-brush",
          class: "kels-utilities-show-monster-art",
          onclick: () => {
            const imagePopout = new ImagePopout(monsterArtworkUrl, {
              title: monsterName,
            });
            imagePopout.render(true);
            imagePopout.shareImage();
          },
        });
      })
    );

    hookName = "getActorDirectoryEntryContext";
    this.hooksShowMonsterArtwork.set(
      hookName,
      Hooks.on(hookName, async (html, entryOptions) => {
        entryOptions.push({
          name: `${Constants.moduleDisplayName}: Show Monster Artwork`,
          icon: '<i class="fa-solid fa-brush"></i>',
          callback: (li) => {
            const actor = game.actors.get(li.data("documentId"));

            const monsterName = actor.name;
            const monsterArtworkUrl = this.monsterArtworkUrl(monsterName);

            if (monsterArtworkUrl == null) {
              return;
            }

            const imagePopout = new ImagePopout(monsterArtworkUrl, {
              title: monsterName,
            });
            imagePopout.render(true);
            imagePopout.shareImage();
          },
          condition: (li) => {
            const actor = game.actors.get(li.data("documentId"));
            return (
              getSetting("enableShowMonsterArtwork") &&
              game.user.isGM &&
              actor.type == "npc"
            );
          },
        });
      })
    );

    return this.hooksShowMonsterArtwork;
  }

  async unregisterHooksShowMonsterArtwork() {
    log('Unregistering "ShowMonsterArtwork" hooks...');

    for (let [key, hook] of this.hooksShowMonsterArtwork.entries()) {
      log(`Unregistering ${key} with ${hook} id.`);
      Hooks.off(key, hook);
    }

    this.hooksShowMonsterArtwork = new Map();

    return this.hooksShowMonsterArtwork;
  }

  async registerHooksOpenMonsterStatblock() {
    log('Registering "OpenMonsterStatblock" hooks...');

    let hookName = "getActorSheetHeaderButtons";
    this.hooksOpenMonsterStatblock.set(
      hookName,
      Hooks.on(hookName, (actorSheet, buttons) => {
        if (!game.user.isGM) {
          return;
        }

        const monsterName = game.actors.get(actorSheet.object._id).name;
        const monsterStatblockUrl = this.monsterStatblockUrl(monsterName);

        if (monsterStatblockUrl == null) {
          return;
        }

        buttons.unshift({
          label: "Stat Block",
          icon: "fa fa-th",
          class: "kels-utilities-open-monster-statblock",
          onclick: () => {
            window.open(monsterStatblockUrl);
          },
        });
      })
    );

    hookName = "getActorDirectoryEntryContext";
    this.hooksOpenMonsterStatblock.set(
      hookName,
      Hooks.on(hookName, async (html, entryOptions) => {
        entryOptions.push({
          name: `${Constants.moduleDisplayName}: Open Stat Block`,
          icon: '<i class="fa fa-th"></i>',
          callback: (li) => {
            const actor = game.actors.get(li.data("documentId"));

            const monsterName = actor.name;
            const monsterStatblockUrl = this.monsterStatblockUrl(monsterName);

            if (monsterStatblockUrl == null) {
              return;
            }

            window.open(monsterStatblockUrl);
          },
          condition: (li) => {
            const actor = game.actors.get(li.data("documentId"));
            return (
              getSetting("enableShowMonsterArtwork") &&
              game.user.isGM &&
              actor.type == "npc"
            );
          },
        });
      })
    );

    return this.hooksOpenMonsterStatblock;
  }

  async unregisterHooksOpenMonsterStatblock() {
    log('Unregistering "OpenMonsterStatblock" hooks...');

    for (let [key, hook] of this.hooksOpenMonsterStatblock.entries()) {
      log(`Unregistering ${key} with ${hook} id.`);
      Hooks.off(key, hook);
    }

    this.hooksOpenMonsterStatblock = new Map();

    return this.hooksOpenMonsterStatblock;
  }
}

export { log, KelsUtilities };
