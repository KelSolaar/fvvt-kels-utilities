import { Constants } from "./Constants.js";

function log(message) {
  console.log(
    `%c${Constants.moduleName}%c | ` + message,
    "color:#efc160",
    "color:#bbbbbb"
  );
}
class KelsUtilities {
  constructor() {
    this.Constants = Constants;
    this.log = log;

    this.hooksTurnIntoItemPiles = new Map();
    this.hooksShowMonsterArt = new Map();
    this.hooksOpenMonsterStatblock = new Map();
  }

  isModuleActive(moduleName) {
    return Boolean(game.modules.get(moduleName)?.active);
  }

  async monsterResources() {
    return await fetch(Constants.pathJsonMonsterResources).then((response) =>
      response.json()
    );
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

  async registerHooksShowMonsterArt() {
    log('Registering "ShowMonsterArt" hooks...');

    let monsterResources = await this.monsterResources();

    let hookName = "getActorSheetHeaderButtons";
    this.hooksShowMonsterArt.set(
      hookName,
      Hooks.on(hookName, async (actorSheet, buttons) => {
        if (!game.user.isGM) {
          return;
        }

        let monsterName = actorSheet.object.name;
        if (!(monsterName in monsterResources)) {
          log(
            `"${monsterName}" monster name was not found in monster resources!`
          );
          return;
        }
        let monsterArtUrl = monsterResources[monsterName].image_url;

        buttons.unshift({
          label: "Art",
          icon: "fa-solid fa-brush",
          class: "kels-utilities-show-monster-art",
          onclick: () => {
            const imagePopout = new ImagePopout(monsterArtUrl, {
              title: monsterName,
            });
            imagePopout.render(true);
            imagePopout.shareImage();
          },
        });
      })
    );

    return this.hooksShowMonsterArt;
  }

  async unregisterHooksShowMonsterArt() {
    log('Unregistering "ShowMonsterArt" hooks...');

    for (let [key, hook] of this.hooksShowMonsterArt.entries()) {
      log(`Unregistering ${key} with ${hook} id.`);
      Hooks.off(key, hook);
    }

    this.hooksShowMonsterArt = new Map();

    return this.hooksShowMonsterArt;
  }

  async registerHooksOpenMonsterStatblock() {
    log('Registering "OpenMonsterStatblock" hooks...');

    let monsterResources = await this.monsterResources();

    let hookName = "getActorSheetHeaderButtons";
    this.hooksOpenMonsterStatblock.set(
      hookName,
      Hooks.on(hookName, async (actorSheet, buttons) => {
        if (!game.user.isGM) {
          return;
        }

        let monsterName = actorSheet.object.name;
        if (!(monsterName in monsterResources)) {
          log(
            `"${monsterName}" monster name was not found in monster resources!`
          );
          return;
        }
        let monsterStatblockUrl = monsterResources[monsterName].statblock_url;

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
