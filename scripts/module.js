import { Constants } from "./lib/Constants.js";
import { KelsUtilities, log } from "./lib/lib.js";
import { getSetting, registerSettings } from "./lib/settings.js";

Hooks.once("init", async function () {
  log("Initialising module...");
  registerSettings();

  game.kelsUtilities = await new KelsUtilities();

  if (getSetting("enableEquipmentQualityIntegration")) {
    game.kelsUtilities.registerHooksTurnIntoItemPiles();
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
    .addClass("form-group group-header")
    .html("Equipment Quality")
    .insertBefore(
      $(
        `[name="${Constants.moduleName}.enableEquipmentQualityIntegration"]`
      ).parents("div.form-group:first")
    );
  $("<div>")
    .addClass("form-group group-header")
    .html("NPC Actions")
    .insertBefore(
      $(`[name="${Constants.moduleName}.enableShowMonsterArtwork"]`).parents(
        "div.form-group:first"
      )
    );
});
