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
  Constants.pathJsonMonsterImageUrls = Constants.rootResources.files.find(
    (files) => files.includes("monster_image_urls.json")
  );
});

Hooks.once("ready", async function () {
  game.kelsUtilities = new KelsUtilities();

  if (getSetting("enableEquipmentQualityIntegration")) {
    log('Registering "TurnIntoItemPiles" hooks...');
    game.kelsUtilities.registerHooksTurnIntoItemPiles();
  }

  if (getSetting("enableShowMonsterArt")) {
    log('Registering "ShowMonsterArt" hooks...');
    game.kelsUtilities.registerHooksShowMonsterArt();
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
    .html("Monster Art")
    .insertBefore(
      $(`[name="${Constants.moduleName}.enableShowMonsterArt"]`).parents(
        "div.form-group:first"
      )
    );
});
