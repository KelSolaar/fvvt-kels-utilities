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
  }

  static isModuleActive(moduleName) {
    return Boolean(game.modules.get(moduleName)?.active);
  }

  static tableResultToEquipmentQuality(tableResult) {
    const range = tableResult.results[0].range;

    for (const equipmentQuality of Constants.equipmentQuality) {
      if (equipmentQuality.range.toString() == range.toString()) {
        return equipmentQuality;
      }
    }
  }

  async modifyTokenEquipementQuality(token) {
    let gmState = null;
    if (KelsUtilities.isModuleActive("df-manual-rolls")) {
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
      const equipmentQuality =
        KelsUtilities.tableResultToEquipmentQuality(results);

      if (item.system.price?.value != undefined) {
        await item.update({
          name: item.name + " " + "(" + equipmentQuality.name + ")",
          "system.price.value":
            item.system.price.value * equipmentQuality.priceMultiplier,
        });
      }
    }

    if (KelsUtilities.isModuleActive("df-manual-rolls")) {
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
    const monsterImageUrls = await fetch(
      game.kelsUtilities.Constants.pathJsonMonsterImageUrls
    ).then((response) => response.json());

    const npcSheetNames = Object.values(CONFIG.Actor.sheetClasses.npc)
      .map((sheetClass) => sheetClass.cls)
      .map((sheet) => sheet.name);

    npcSheetNames.forEach((sheetName) => {
      let hookName = `render${sheetName}`;
      this.hooksShowMonsterArt.set(
        hookName,
        Hooks.on(hookName, async (app, html, data) => {
          if (!data.owner || !data.actor) return;

          let monsterName = data.actor.name;
          if (!(monsterName in monsterImageUrls)) {
            log(
              `"${monsterName}" monster name was not found in monster image urls!`
            );
            return;
          }

          let monsterImageUrl = monsterImageUrls[monsterName].image_url;
          let button = $(
            `<a class="kels-utilities-open-art"><i class="fa-solid fa-brush"></i> Art</a>`
          );
          button.click((event) => {
            const imagePopout = new ImagePopout(monsterImageUrl, {
              title: monsterName,
            });
            imagePopout.render(true);
            imagePopout.shareImage();
          });

          html.closest(".app").find(".kels-utilities-open-art").remove();
          let titleElement = html.closest(".app").find(".window-title");
          if (!app._minimized) {
            button.insertAfter(titleElement);
          }
        })
      );
    });

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
}

export { log, KelsUtilities };
