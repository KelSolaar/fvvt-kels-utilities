import { Constants } from "./Constants.js";

const debouncedReload = foundry.utils.debounce(
  () => window.location.reload(),
  100
);

function registerSettings() {
  game.settings.register(
    Constants.moduleName,
    "enableEquipmentQualityIntegration",
    {
      name: 'Enable Equipment Quality for "ItemPiles"',
      hint: 'When enabled, the equipment (item) quality of "ItemPiles" converted tokens is randomly changed as a function of the "Equipment Quality" roll table. The quality is reflected in the item modified name and price.',
      scope: "world",
      config: true,
      default: true,
      type: Boolean,
      onChange: async (value) => {
        console.log(game.kelsUtilities.hooksTurnIntoItemPiles);
        if (game.kelsUtilities.hooksTurnIntoItemPiles.size == 0) {
          game.kelsUtilities.registerHooksTurnIntoItemPiles();
        } else {
          game.kelsUtilities.unregisterHooksTurnIntoItemPiles();
        }
      },
    }
  );

  for (const equipmentQuality of Constants.equipmentQuality) {
    game.settings.register(
      Constants.moduleName,
      "equipmentQuality" + equipmentQuality.name.replace(/\s/g, ""),
      {
        name: equipmentQuality.name,
        hint: equipmentQuality.description,
        scope: "world",
        config: true,
        default: equipmentQuality.priceMultiplier,
        type: Number,
      }
    );
  }

  game.settings.register(Constants.moduleName, "enableShowMonsterArtwork", {
    name: 'Enable the "Show Monster Artwork" action',
    hint: 'When enabled, this adds a new action to the "NPC" sheets that allows showing to the players available monster artwork.',
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
    name: 'Enable the "Open Monster Art" action',
    hint: 'When enabled, this adds a new action to the "NPC" sheets that allows opening the available monster stat block in a browser.',
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
