/*
Set compendium item prices.
*/

const sourcePackName = "dnd5e.items";
const targetPackName = "world.ddb-ramblings-ddb-items";

const substitutions = {
  //
  ", +": " +",
  " ft. x ": "x",
  " ft.": "",
  //
  " (1 day)": "",
  " (10-foot)": "",
  " (bag of 20)": "",
  " (bag of 1,000)": "",
  " (per day)": "",
  "(10 foot)": "(10-foot)",
  //
  Arrows: "Arrow",
  //
  "Alchemist's Fire (flask)": "Alchemist's Fire",
  //
  Bolts: "Bolt",
  //
  "Bottle, Glass": "Glass Bottle",
  //
  "Case, Crossbow Bolt": "Crossbow Bolt Case",
  "Case, Map or Scroll": "Map or Scroll Case",
  //
  "Clothes, Common": "Common Clothes",
  "Clothes, Costume": "Costume Clothes",
  "Clothes, Fine": "Fine Clothes",
  "Clothes, Traveler's": "Traveler's Clothes",
  //
  "Crossbow, Heavy": "Heavy Crossbow",
  "Crossbow, heavy": "Heavy Crossbow",
  "Crossbow, Hand": "Hand Crossbow",
  "Crossbow, hand": "Hand Crossbow",
  "Crossbow, Light": "Light Crossbow",
  "Crossbow, light": "Light Crossbow",
  //
  "Elemental Gem (Red Corundum)": "Elemental Gem of Fire",
  "Elemental Gem (Yellow Diamond)": "Elemental Gem of Earth",
  "Elemental Gem (Emerald)": "Elemental Gem of Water",
  "Elemental Gem (Blue Sapphire)": "Elemental Gem of Air",
  //
  "Flask or Tankard": "Tankard",
  //
  "Gray Bag of Tricks": "Bag of Tricks (Grey)",
  "Rust Bag of Tricks": "Bag of Tricks (Rust)",
  "Tan Bag of Tricks": "Bag of Tricks (Tan)",
  //
  "Hammer, Sledge": "Sledgehammer",
  //
  "Healing (Greater)": "Greater Healing",
  "Healing (Superior)": "Superior Healing",
  "Healing (Supreme)": "Supreme Healing",
  //
  Hide: "Hide Armor",
  "Hide Armor, +": "Hide Armor +",
  "Resistance, Hide Armor": "Resistance, Hide",
  //
  "Holy Water (flask)": "Flask of Holy Water",
  //
  "Lantern, Bullseye": "Bullseye Lantern",
  "Lantern, Hooded": "Hooded Lantern",
  //
  Leather: "Leather Armor",
  " Armorworker": "worker",
  "Leather Armor, +": "Leather Armor +",
  "Resistance, Studded Leather Armor": "Resistance, Studded Leather",
  "Resistance, Leather Armor": "Resistance, Leather",
  //
  "Little Bag": "Bag",
  //
  "Mirror, Steel": "Steel Mirror",
  //
  Needles: "Needle",
  //
  "Oil (flask)": "Oil Flask",
  //
  Padded: "Padded Armor",
  "Padded Armor, +": "Padded Armor +",
  "Resistance, Padded Armor": "Resistance, Padded",
  //
  "Pick, Miner's": "Miner's Pick",
  //
  Plate: "Plate Armor",
  "Plate Armor, +": "Plate Armor +",
  "Armor Armor": "Armor",
  "Resistance, Plate Armor": "Resistance, Plate",
  "Resistance, Half Plate Armor": "Resistance, Half Plate",
  //
  "Poison, Basic (vial)": "Basic Poison",
  //
  "Pot, Iron": "Iron Pot",
  //
  "Potion of Resistance": "Potion of Acid Resistance",
  //
  "Ram, Portable": "Portable Ram",
  //
  "Rope, Hempen (50 feet)": "Hempen Rope (50 ft.)",
  "Rope, Silk (50 feet)": "Silk Rope (50 ft.)",
  //
  "Saddle, Exotic": "Exotic Saddle",
  "Saddle, Military": "Military Saddle",
  "Saddle, Pack": "Pack Saddle",
  "Saddle, Riding": "Riding Saddle",
  //
  "Scale, Merchant's": "Merchant's Scale",
  //
  "Sling Bullets": "Sling Bullet",
  //
  "Spikes, Iron (10)": "Iron Spike",
  //
  Splint: "Splint Armor",
  "Splint Armor, +": "Splint Armor +",
  "Tent, Two-Person": "Two-Person Tent",
  "Resistance, Splint Armor": "Resistance, Splint",
  //
  // Feather Token
  "(Anchor)": "Anchor",
  "(Bird)": "Bird",
  "(Fan)": "Fan",
  "(Swan Boat)": "Swan Boat",
  "(Tree)": "Tree",
  "(Whip)": "Whip",
  // Dragon Scale Mail
  " (Black)": "",
  " (Blue)": "",
  " (Brass)": "",
  " (Bronze)": "",
  " (Copper)": "",
  " (Gold)": "",
  " (Green)": "",
  " (Red)": "",
  " (Silver)": "",
  " (White)": "",
  //
  "(0 - Cantrip)": "Cantrip",
  "(1st Level)": "1st Level",
  "(2nd Level)": "2nd Level",
  "(3rd Level)": "3rd Level",
  "(4th Level)": "4th Level",
  "(5th Level)": "5th Level",
  "(6th Level)": "6th Level",
  "(7th Level)": "7th Level",
  "(8th Level)": "8th Level",
  "(9th Level)": "9th Level",
  // Paper
  "(one sheet)": "",
};
const resistances = [
  "Acid",
  "Cold",
  "Fire",
  "Force",
  "Lightning",
  "Necrotic",
  "Poison",
  "Psychic",
  "Radiant",
  "Thunder",
];
const armors = [
  "Breastplate",
  "Chain Mail",
  "Chain Shirt",
  "Half Plate",
  "Hide",
  "Leather",
  "Padded",
  "Plate",
  "Ring Mail",
  "Scale Mail",
  "Splint",
  "Studded Leather",
];
for (armor of armors) {
  for (resistance of resistances) {
    substitutions[
      `Armor of ${resistance} Resistance, ${armor}`
    ] = `${armor} Armor of Resistance`;
  }
}

const sourcePack = game.packs.get(sourcePackName);
const targetPack = game.packs.get(targetPackName);

const isTargetPackLocked = targetPack.locked;
if (isTargetPackLocked) await targetPack.configure({ locked: false });

const isSourcePackLocked = sourcePack.locked;
if (isSourcePackLocked) await sourcePack.configure({ locked: false });

await sourcePack.getDocuments();
await targetPack.getDocuments();

for (let targetItem of targetPack) {
  let name = targetItem.name;
  for ([pattern, substitution] of Object.entries(substitutions)) {
    name = name.replace(pattern, substitution);
  }

  const sourceItem = sourcePack.getName(name);
  if (sourceItem == undefined) {
    console.warn(
      `"${name}" "(${targetItem.name})" item was not found in "${sourcePackName}" pack!`
    );
    continue;
  }

  if (sourceItem.system.price.value != 0) {
    const sourceItemPrice = sourceItem.system.price.value;
    const sourceItemDenomination = sourceItem.system.price.denomination;
    
    console.log(
      `Setting "${targetItem.name}" item price to "${sourceItemPrice} ${sourceItemDenomination}"...`
    );
    
    await targetItem.update({
      "system.price.value": sourceItemPrice,
      "system.price.denomination": sourceItemDenomination,
    });
  }
}

if (isTargetPackLocked) await targetPack.configure({ locked: true });
if (isSourcePackLocked) await sourcePack.configure({ locked: true });