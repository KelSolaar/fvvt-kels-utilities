/*
Create many items, the advanced way.
*/

const folderName = "Folder Name";
const source = "Source";
const itemsData = [
  {
    name: "Foo",
    price: 5,
    denomination: "cp",
    weight: null,
    description: "<p>Bar.</p>",
    source: source,
  },
  {
    name: "John",
    price: 1,
    denomination: "sp",
    weight: null,
    description: "<p>Doe.</p>",
    source: source,
  },
];

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

for (const itemData of itemsData) {
  let item = game.items.getName(itemData.name);
  if (item != undefined) continue;

  item = await Item.create(
    {
      name: itemData.name,
      type: "loot",
      folder: folder,
      system: {
        price: { value: itemData.price, denomination: itemData.denomination },
        weight: itemData.weight,
        description: { value: itemData.description },
        source: itemData.source,
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
