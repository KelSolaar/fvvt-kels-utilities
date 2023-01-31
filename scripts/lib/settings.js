import { Constants } from "./constants.js";

function registerSettings() {
  game.settings.register(
    Constants.moduleName,
    "enableCombatEndTurnIntoItemPiles",
    {
      name: game.i18n.localize(
        `${Constants.moduleName}.settings.enableCombatEndTurnIntoItemPiles.name`
      ),
      hint: game.i18n.localize(
        `${Constants.moduleName}.settings.enableCombatEndTurnIntoItemPiles.hint`
      ),
      scope: "world",
      config: true,
      default: true,
      type: Boolean,
      onChange: async (value) => {
        console.log(game.kelsUtilities.hooksCombatEndTurnIntoItemPiles);
        if (game.kelsUtilities.hooksCombatEndTurnIntoItemPiles.size == 0) {
          game.kelsUtilities.registerhooksCombatEndTurnIntoItemPiles();
        } else {
          game.kelsUtilities.unregisterhooksCombatEndTurnIntoItemPiles();
        }
      },
    }
  );

  game.settings.register(
    Constants.moduleName,
    "enableEquipmentQualityIntegration",
    {
      name: game.i18n.localize(
        `${Constants.moduleName}.settings.enableEquipmentQualityIntegration.name`
      ),
      hint: game.i18n.localize(
        `${Constants.moduleName}.settings.enableEquipmentQualityIntegration.hint`
      ),
      scope: "world",
      config: true,
      default: true,
      type: Boolean,
      onChange: async (value) => {
        console.log(game.kelsUtilities.hooksModifyEquipmentQuality);
        if (game.kelsUtilities.hooksModifyEquipmentQuality.size == 0) {
          game.kelsUtilities.registerHooksModifyEquipmentQuality();
        } else {
          game.kelsUtilities.unregisterHooksModifyEquipmentQuality();
        }
      },
    }
  );

  for (const equipmentQuality of Constants.equipmentQuality) {
    game.settings.register(Constants.moduleName, equipmentQuality.name, {
      name: game.i18n.localize(
        `${Constants.moduleName}.settings.${equipmentQuality.name}.name`
      ),
      hint: game.i18n.localize(
        `${Constants.moduleName}.settings.${equipmentQuality.name}.description`
      ),
      scope: "world",
      config: true,
      default: equipmentQuality.priceMultiplier,
      type: Number,
    });
  }

  game.settings.register(Constants.moduleName, "enableShowMonsterArtwork", {
    name: game.i18n.localize(
      `${Constants.moduleName}.settings.enableShowMonsterArtwork.name`
    ),
    hint: game.i18n.localize(
      `${Constants.moduleName}.settings.enableShowMonsterArtwork.hint`
    ),
    scope: "world",
    config: true,
    default: true,
    type: Boolean,
    onChange: async (value) => {
      if (getSetting("enableShowMonsterArtwork")) {
        game.kelsUtilities.registerHooksShowMonsterArtwork();
      } else {
        game.kelsUtilities.unregisterHooksShowMonsterArtwork();
      }
    },
  });

  game.settings.register(Constants.moduleName, "enableOpenMonsterStatblock", {
    name: game.i18n.localize(
      `${Constants.moduleName}.settings.enableOpenMonsterStatblock.name`
    ),
    hint: game.i18n.localize(
      `${Constants.moduleName}.settings.enableOpenMonsterStatblock.hint`
    ),
    scope: "world",
    config: true,
    default: true,
    type: Boolean,
    onChange: async (value) => {
      if (getSetting("enableOpenMonsterStatblock")) {
        game.kelsUtilities.registerHooksOpenMonsterStatblock();
      } else {
        game.kelsUtilities.unregisterHooksOpenMonsterStatblock();
      }
    },
  });
}

function getSetting(key) {
  return game.settings.get(Constants.moduleName, key);
}

function setSetting(key, value) {
  return game.settings.set(Constants.moduleName, key, value);
}

export { registerSettings, getSetting, setSetting };
