/*
Create merchant item quantities.
*/

const actorName = "Aurora's Whole Realms Spring Catalogue";

for (let actor of game.actors.filter((actor) => actor.name == actorName)) {
  for (let items of Object.values(actor.itemTypes)) {
    for (let item of items) {
      await item.update({
        "system.quantity": 100,
      });
    }
  }
}