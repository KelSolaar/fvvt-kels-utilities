import { Constants } from "./lib/constants.js";
import { KelsUtilities, log } from "./lib/lib.js";
import { getSetting, registerSettings } from "./lib/settings.js";

Hooks.once("init", async function () {
  log("Initialising module...");
  
  registerSettings();

  game.kelsUtilities = await new KelsUtilities();

  if (getSetting("enableCombatEndTurnIntoItemPiles")) {
    game.kelsUtilities.registerCombatEndTurnIntoItemPiles();
  }

  if (getSetting("enableEquipmentQualityIntegration")) {
    game.kelsUtilities.registerHooksModifyEquipmentQuality();
  }

  if (getSetting("enableShowMonsterArtwork")) {
    game.kelsUtilities.registerHooksShowMonsterArtwork();
  }

  if (getSetting("enableOpenMonsterStatblock")) {
    game.kelsUtilities.registerHooksOpenMonsterStatblock();
  }
});

Hooks.once("ready", async function () {
  log("Module is ready!");
});

Hooks.on("renderSettingsConfig", (app, html, data) => {
  $("<div>")
    .addClass(".kels-settings-header")
    .html("<h1>Combat End</h1>")
    .insertBefore(
      $(
        `[name="${Constants.moduleName}.enableCombatEndTurnIntoItemPiles"]`
      ).parents("div.form-group:first")
    );
  $("<div>")
    .addClass(".kels-settings-header")
    .html("<h1>Equipment Quality</h1>")
    .insertBefore(
      $(
        `[name="${Constants.moduleName}.enableEquipmentQualityIntegration"]`
      ).parents("div.form-group:first")
    );
  $("<div>")
    .addClass(".kels-settings-header")
    .html("<h1>Non-Player Character Actions</h1>")
    .insertBefore(
      $(`[name="${Constants.moduleName}.enableShowMonsterArtwork"]`).parents(
        "div.form-group:first"
      )
    );
});
