import {
    Constants
} from './lib/Constants.js';
import {
    KelsUtilities,
    log
} from "./lib/lib.js";
import {
    getSetting,
    registerSettings
} from './lib/settings.js';

Hooks.once('init', async function () {
    log("Initialising module...");
    registerSettings();
});

Hooks.once('ready', async function () {
    game.kelsUtilities = new KelsUtilities();

    if (getSetting("enableEquipmentQualityIntegration")) {
        log("Registering \"item-piles-turnIntoItemPiles\" hook...");
        game.kelsUtilities.registerHookTurnIntoItemPiles();
    }

    log("Module is ready!");
});

Hooks.on("renderSettingsConfig", (app, html, data) => {
    $('<div>').addClass('form-group group-header').html("Equipment Quality").insertBefore($(`[name="${Constants.moduleName}.enableEquipmentQualityIntegration"]`).parents('div.form-group:first'));
});