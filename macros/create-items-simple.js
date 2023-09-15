/*
Create many items, the simple way.
*/

const itemNames = [
  "Jeweled gold crown",
  "Jeweled platinum ring",
  "Small gold statuette set with rubies",
  "Gold cup set with emeralds",
  "Gold jewelry box with platinum filigree",
  "Painted gold child’s sarcophagus",
  "Jade game board with solid gold playing pieces",
  "Bejeweled ivory drinking horn with gold filigree",
];
const price = 7500;
const denomination = "gp";
const folderName = "7,500 gp Art Objects";
const source = "DMG pg. 135";
let folder = game.folders.contents.find(
  (folder) => folder.type === "Item" && folder.name === folderName
);

if (folder == undefined) {
  folder = await Folder.create(
    {
      name: folderName,
      type: "Item",
    },
    { displaySheet: false }
  );
}

for (const itemName of itemNames) {
  let item = game.items.getName(itemName);
  if (item != undefined) continue;

  item = await Item.create(
    {
      name: itemName,
      type: "loot",
      folder: folder,
      system: {
        price: { value: price, denomination: denomination },
        source: source,
      },
      permission: {
        default: CONST.DOCUMENT_PERMISSION_LEVELS.LIMITED,
      },
    },
    {
      displaySheet: false,
    }
  );
}
