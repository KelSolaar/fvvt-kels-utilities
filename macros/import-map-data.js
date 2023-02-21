/*
Import the map data from a json file generated with the following python
script: https://gist.github.com/KelSolaar/6f0847adb6bfa08665287a18039c8e24
*/

const mapName = "Waterdeep";
const offset = [1144, 1169];
const scale = [0.9795, 0.9795];
const icons = {
  Area: { icon: "modules/kels-utilities/icons/circle.svg", tint: "#ffffff" },
  Business: { icon: "icons/svg/hanging-sign.svg", tint: "#f44336" },
  "City Building": {
    icon: "modules/kels-utilities/icons/building.svg",
    tint: "#9c27b0",
  },
  Guildhall: { icon: "modules/kels-utilities/icons/hall.svg", tint: "#3f51b5" },
  "Inn, Tavern, Festhall": {
    icon: "modules/kels-utilities/icons/beer.svg",
    tint: "#03a9f4",
  },
  Miscellaneous: {
    icon: "modules/kels-utilities/icons/miscellaneous.svg",
    tint: "#009688",
  },
  "Noble Villa": { icon: "icons/svg/house.svg", tint: "#8bc34a" },
  Temple: { icon: "icons/svg/temple.svg", tint: "#ffeb3b" },
  Warehouse: {
    icon: "modules/kels-utilities/icons/warehouse.svg",
    tint: "#ff9800",
  },
};

const mapData = await fetch(`atlas/${mapName.toLowerCase()}_data.json`).then(
  (response) => response.json()
);

let folder = game.folders.contents.find(
  (folder) => folder.type === "JournalEntry" && folder.name === mapName
);

if (folder == undefined) {
  folder = await Folder.create(
    {
      name: mapName,
      type: "JournalEntry",
    },
    { displaySheet: false }
  );
}

for (const location of mapData.locations) {
  if (location.name == "GROUP") continue;

  let journalEntry = game.journal.getName(location.name);
  if (journalEntry != undefined) continue;

  journalEntry = await JournalEntry.create(
    {
      name: location.name,
      folder: folder,
      permission: {
        default: CONST.DOCUMENT_PERMISSION_LEVELS.OBSERVER,
      },
    },
    {
      displaySheet: false,
    }
  );

  let content = location.description;
  const urlWiki = location.references["Fandom Wiki"];
  if (urlWiki) {
    content =
      content + `<h3>References</h3><ul><li><p>${urlWiki}</p></li></ul>`;
  }
  const page = await JournalEntryPage.create(
    {
      name: location.name,
      text: { content: content },
      title: {
        show: false,
      },
    },
    { parent: journalEntry, displaySheet: false }
  );

  const noteData = {
    entryId: journalEntry.id,
    text: location.name,
    global: false,
    texture: {
      src: icons[location.type].icon,
      tint: icons[location.type].tint,
    },
    iconSize: 32,
    x: location.coordinates[0] * scale[0] + offset[0],
    y: location.coordinates[1] * scale[1] + offset[1],
  };
  let note = await canvas.scene.createEmbeddedDocuments("Note", [noteData]);
}