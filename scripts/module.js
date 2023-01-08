import {
    log
} from "./lib/lib.js";
import {
    KelsUtilities
} from "./lib/lib.js";

Hooks.once('init', async function () {
    log("Initialising module...");
});

Hooks.once('ready', async function () {
    const KelsUtilities = new KelsUtilities();

    log("Registering \"item-piles-turnIntoItemPiles\" hook...");
    KelsUtilities.registerHookTurnIntoItemPiles();

    log("Module is ready!");
});