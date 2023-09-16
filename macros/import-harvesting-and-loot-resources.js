/*
Import the harvesting and loot resources data from the
*resources/harvesting_and_loot_resources.json* json file.
*/

const moduleName = game.kelsUtilities.Constants.moduleName;

const folderName = "The Thieves Guild";

const harvestingAndLootResources = await fetch(
  game.kelsUtilities.Constants.pathHarvestingAndLootResources
).then((response) => response.json());

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

for (const [creatureName, creatureData] of Object.entries(
  harvestingAndLootResources
)) {
  let creatureFolder = game.folders.contents.find(
    (creatureFolder) =>
      creatureFolder.type === "Item" && creatureFolder.name === creatureName
  );

  if (creatureFolder == undefined) {
    creatureFolder = await Folder.create(
      {
        name: creatureName,
        type: "Item",
        parent: folder.id,
      },
      { displaySheet: false }
    );
  }

  for (const itemData of creatureData.harvesting.items) {
    let item = game.items.getName(itemData.name);
    if (item != undefined) continue;

    item = await Item.create(
      {
        name: itemData.name,
        type: "loot",
        folder: creatureFolder,
        system: {
          weight: itemData.weight,
          price: { value: itemData.price, denomination: itemData.denomination },
          description: {
            value: `
<table>
  <tbody>
    <tr>
      <td style="padding-right: 1em; vertical-align: top; white-space: nowrap">
        <strong>Type</strong>
      </td>
      <td style="vertical-align: top">${creatureData.harvesting.type}</td>
    </tr>
    <tr>
      <td style="padding-right: 1em; vertical-align: top; white-space: nowrap">
        <strong>Skill</strong>
      </td>
      <td style="vertical-align: top">${creatureData.harvesting.skill}</td>
    </tr>
    <tr>
      <td style="padding-right: 1em; vertical-align: top; white-space: nowrap">
        <strong>DC</strong>
      </td>
      <td style="vertical-align: top">${itemData.DC}</td>
    </tr>
    <tr>
      <td style="padding-right: 1em; vertical-align: top; white-space: nowrap">
        <strong>Description</strong>
      </td>
      <td>${itemData.description}</td>
    </tr>
    <tr>
      <td style="padding-right: 1em; vertical-align: top; white-space: nowrap">
        <strong>Expire</strong>
      </td>
      <td style="vertical-align: top">${itemData.expire}</td>
    </tr>
    <tr>
      <td style="padding-right: 1em; vertical-align: top; white-space: nowrap">
        <strong>Source</strong>
      </td>
      <td style="vertical-align: top">${creatureData.source}</td>
    </tr>
  </tbody>
</table>
`,
          },
          source: "The Thieves Guild",
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

  const itemName = `${creatureData.name} Meat`;
  let item = game.items.getName(itemName);
  if (item != undefined) continue;

  item = await Item.create({
    name: itemName,
    type: "loot",
    folder: creatureFolder,
    system: {
      description: {
        value: `
<table>
  <thead>
    <tr>
      <th>Beast Size</th>
      <th>DC</th>
      <th>Quantity</th>
      <th>Weight</th>
      <th>Price</th>
      <th>Expire</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>${creatureData.size}</td>
      <td>${creatureData.meat.DC}</td>
      <td>${creatureData.meat.quantity}</td>
      <td>${creatureData.meat.weight}</td>
      <td>${creatureData.meat.price}</td>
      <td>${creatureData.meat.expire}</td>
    </tr>
  </tbody>
</table>
<table>
  <tbody>
    <tr>
      <td style="padding-right: 1em; vertical-align: top; white-space: nowrap">
        <strong>Source</strong>
      </td>
      <td style="vertical-align: top">${creatureData.source}</td>
    </tr>
  </tbody>
</table>
`,
      },
      source: "The Thieves Guild",
    },
  });
}
