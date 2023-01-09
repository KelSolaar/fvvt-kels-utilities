import {
    Constants
} from "./Constants.js";

const debouncedReload = foundry.utils.debounce(() => window.location.reload(), 100);

function registerSettings() {
    game.settings.register(
        Constants.moduleName, "enableEquipmentQualityIntegration", {
            name: "Enable Equipment Quality for \"ItemPiles\".",
            hint: "When enabled, the equipment (item) quality of \"ItemPiles\" converted tokens is randomly changed as a function of the \"Equipment Quality\" roll table. The quality is reflected in the item modified name and price.",
            scope: "world",
            config: true,
            default: true,
            type: Boolean,
            onChange: async (value) => {
                if (game.kelsUtilities.hookTurnIntoItemPiles == undefined) {
                    game.kelsUtilities.log("Registering \"item-piles-turnIntoItemPiles\" hook...");
                    game.kelsUtilities.registerHookTurnIntoItemPiles();

                } else {
                    game.kelsUtilities.log("Unregistering \"item-piles-turnIntoItemPiles\" hook...");
                    game.kelsUtilities.unregisterHookTurnIntoItemPiles();
                }
            },
        });

    for (const equipmentQuality of Constants.equipmentQuality) {
        game.settings.register(
            Constants.moduleName, "equipmentQuality" + equipmentQuality.name.replace(/\s/g, ""), {
                name: equipmentQuality.name,
                hint: equipmentQuality.description,
                scope: "world",
                config: true,
                default: equipmentQuality.priceMultiplier,
                type: Number,
            });
    };
};

function getSetting(key) {
    return game.settings.get(Constants.moduleName, key);
}

function setSetting(key, value) {
    return game.settings.set(Constants.moduleName, key, value);
}

export {
    registerSettings,
    getSetting,
    setSetting,
};