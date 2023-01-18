import { Constants } from "./lib/Constants.js";
import { KelsUtilities, log } from "./lib/lib.js";
import { getSetting, registerSettings } from "./lib/settings.js";

Hooks.once("init", async function () {
  log("Initialising module...");
  registerSettings();

  log("Updating constants...");
  Constants.rootResources = await FilePicker.browse(
    "user",
    `${Constants.path}/resources/`
  );
  Constants.pathJsonMonsterResources = Constants.rootResources.files.find(
    (files) => files.includes("monster_resources.json")
  );
});

Hooks.once("ready", async function () {
  game.kelsUtilities = new KelsUtilities();

  if (getSetting("enableEquipmentQualityIntegration")) {
    game.kelsUtilities.registerHooksTurnIntoItemPiles();
  }

  if (getSetting("enableShowMonsterArt")) {
    game.kelsUtilities.registerHooksShowMonsterArt();
  }

  if (getSetting("enableOpenMonsterStatblock")) {
    game.kelsUtilities.registerHooksOpenMonsterStatblock();
  }

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
    .html("NPC Sheet Actions")
    .insertBefore(
      $(`[name="${Constants.moduleName}.enableShowMonsterArt"]`).parents(
        "div.form-group:first"
      )
    );
});
