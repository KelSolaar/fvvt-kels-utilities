/*
Set tokens item prices.
*/

const compendium = game.packs.get("dnd5e.items");
const tokenType = "npc";

await compendium.getDocuments();

for (let scene of game.scenes) {
  for (let token of scene.tokens.filter(
    (token) => token.actor.type == tokenType
  )) {
    for (let item of token.actor.items) {
      const compendiumItem = compendium.getName(item.name);
      if (compendiumItem == undefined) continue;

      const compendiumItemPrice = compendiumItem.system.price.value;
      if (item.system?.price?.value != 0) continue;

      console.log(`Updating "${token.name}" "${item.name}" price...`);

      await item.update({
        "system.price.value": compendiumItem.system.price.value,
        "system.price.denomination": compendiumItem.system.price.denomination,
      });
    }
  }
}
