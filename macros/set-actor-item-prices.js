/*
Set actors item prices.
*/

const compendium = game.packs.get("dnd5e.items");
const actorType = "npc";
const folder = "Monster Manual";

await compendium.getDocuments();

for (let actor of game.actors.filter(
  (actor) => actor.folder?.name == folder && actor.type == actorType
)) {
  for (let items of Object.values(actor.itemTypes)) {
    for (let item of items) {
      const compendiumItem = compendium.getName(item.name);
      if (compendiumItem == undefined) continue;

      const compendiumItemPrice = compendiumItem.system.price.value;
      if (item.system?.price?.value != 0) continue;

      console.log(`Updating "${actor.name}" "${item.name}" price...`);

      await item.update({
        "system.price.value": compendiumItem.system.price.value,
        "system.price.denomination": compendiumItem.system.price.denomination,
      });
    }
  }
}
