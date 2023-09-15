/*
Create many actors, the simple way.
*/

const avatars = {
  Humanoid: "images/tokens/monsters/token-humanoid.jpg",
};

const actorNames = {
  "Victoro Cassalanter": { type: "humanoid", img: avatars["Humanoid"] },
  "Ammalia Cassalanter": { type: "humanoid", img: avatars["Humanoid"] },
  "Vajra Safahr": { type: "humanoid", img: avatars["Humanoid"] },
  "Renaer Neverember": { type: "humanoid", img: avatars["Humanoid"] },
  "Laeral Silverhand": { type: "humanoid", img: avatars["Humanoid"] },
  Mordenkainen: { type: "humanoid", img: avatars["Humanoid"] },
  "Qilué Veladorn": { type: "humanoid", img: avatars["Humanoid"] },
  "Alustriel Silverhand": { type: "humanoid", img: avatars["Humanoid"] },
  "The Simbul": { type: "humanoid", img: avatars["Humanoid"] },
  Elminster: { type: "humanoid", img: avatars["Humanoid"] },
  "Harkle Harpell": { type: "humanoid", img: avatars["Humanoid"] },
  "Storm Silverhand": { type: "humanoid", img: avatars["Humanoid"] },
  "Syluné Silverhand": { type: "humanoid", img: avatars["Humanoid"] },
  "Dove Falconhand": { type: "humanoid", img: avatars["Humanoid"] },
  "Florin Falconhand": { type: "humanoid", img: avatars["Humanoid"] },
  "Illistyl Elventree": { type: "humanoid", img: avatars["Humanoid"] },
  "Jhessail Silventree": { type: "humanoid", img: avatars["Humanoid"] },
  "Merith Strongbow": { type: "humanoid", img: avatars["Humanoid"] },
  "Lanseril Snowmantle": { type: "humanoid", img: avatars["Humanoid"] },
  "Artus Cimber": { type: "humanoid", img: avatars["Humanoid"] },
  "Volothamp Geddarm": { type: "humanoid", img: avatars["Humanoid"] },
  "Minsc and Boo": { type: "humanoid", img: avatars["Humanoid"] },
  Krydle: { type: "humanoid", img: avatars["Humanoid"] },
  Delina: { type: "humanoid", img: avatars["Humanoid"] },
  "Vartan Hai Sylvar": { type: "humanoid", img: avatars["Humanoid"] },
  "Priam Agrivar": { type: "humanoid", img: avatars["Humanoid"] },
  "Ishi Barasume": { type: "humanoid", img: avatars["Humanoid"] },
  Minder: { type: "humanoid", img: avatars["Humanoid"] },
  "Foxilon Cardluck": { type: "humanoid", img: avatars["Humanoid"] },
  Shandie: { type: "humanoid", img: avatars["Humanoid"] },
  "Obaya Uday": { type: "humanoid", img: avatars["Humanoid"] },
  Manshoon: { type: "humanoid", img: avatars["Humanoid"] },
  Yoshimo: { type: "humanoid", img: avatars["Humanoid"] },
  "The Nameless One": { type: "humanoid", img: avatars["Humanoid"] },
  "Valygar Corthala": { type: "humanoid", img: avatars["Humanoid"] },
  "Abdel Adrian": { type: "humanoid", img: avatars["Humanoid"] },
  Hexxat: { type: "humanoid", img: avatars["Humanoid"] },
  "Pikel Bouldershoulder": { type: "humanoid", img: avatars["Humanoid"] },
  "Ivan Bouldershoulder": { type: "humanoid", img: avatars["Humanoid"] },
  "Cadderly Bonaduce": { type: "humanoid", img: avatars["Humanoid"] },
  Hrolf: { type: "humanoid", img: avatars["Humanoid"] },
  "Drizzt Do’Urden": { type: "humanoid", img: avatars["Humanoid"] },
  Guenhwyvar: { type: "humanoid", img: avatars["Humanoid"] },
  Ruqiah: { type: "humanoid", img: avatars["Humanoid"] },
  "Reginald Roundshield": { type: "humanoid", img: avatars["Humanoid"] },
  "Krebbyg Masq’il’yr": { type: "humanoid", img: avatars["Humanoid"] },
  "Spider Parrafin": { type: "humanoid", img: avatars["Humanoid"] },
  "Arkhan the Cruel": { type: "humanoid", img: avatars["Humanoid"] },
  "Tyril Tallguy": { type: "humanoid", img: avatars["Humanoid"] },
  "Dagny Halvor": { type: "humanoid", img: avatars["Humanoid"] },
  Jamilah: { type: "humanoid", img: avatars["Humanoid"] },
  Hitch: { type: "humanoid", img: avatars["Humanoid"] },
  Dragonbait: { type: "humanoid", img: avatars["Humanoid"] },
  "Brawlwin Chainminer": { type: "humanoid", img: avatars["Humanoid"] },
  "Durnan (proprietor)": { type: "humanoid", img: avatars["Humanoid"] },
  "Skip Brickard": { type: "humanoid", img: avatars["Humanoid"] },
  "Diath Woodrow": { type: "humanoid", img: avatars["Humanoid"] },
  "Evelyn Marthain": { type: "humanoid", img: avatars["Humanoid"] },
  Strix: { type: "humanoid", img: avatars["Humanoid"] },
  Alias: { type: "humanoid", img: avatars["Humanoid"] },
  "Akabar Bel Akash": { type: "humanoid", img: avatars["Humanoid"] },
  "Olive Rustkettle": { type: "humanoid", img: avatars["Humanoid"] },
  Mirt: { type: "humanoid", img: avatars["Humanoid"] },
  "The Black Viper": { type: "humanoid", img: avatars["Humanoid"] },
  "Artemis Entreri": { type: "humanoid", img: avatars["Humanoid"] },
  Joppa: { type: "humanoid", img: avatars["Humanoid"] },
  "Fel’rekt Lafeen": { type: "humanoid", img: avatars["Humanoid"] },
  "Soluun Xibrindas": { type: "humanoid", img: avatars["Humanoid"] },
  "Jarlaxle Baenre": { type: "humanoid", img: avatars["Humanoid"] },
  "Danilo Thann": { type: "humanoid", img: avatars["Humanoid"] },
  "Paultin Seppa": { type: "humanoid", img: avatars["Humanoid"] },
  Calliope: { type: "humanoid", img: avatars["Humanoid"] },
  "Ziraj the Hunter": { type: "humanoid", img: avatars["Humanoid"] },
  "Skeemo Weirdbottle": { type: "humanoid", img: avatars["Humanoid"] },
  "Davil Starsong": { type: "humanoid", img: avatars["Humanoid"] },
  "Tashlyn Yafeera": { type: "humanoid", img: avatars["Humanoid"] },
  "Istrid Horn": { type: "humanoid", img: avatars["Humanoid"] },
  Nihiloor: { type: "humanoid", img: avatars["Humanoid"] },
  "Noska Ur’gray": { type: "humanoid", img: avatars["Humanoid"] },
  "Nar’l Xibrindas": { type: "humanoid", img: avatars["Humanoid"] },
  Ahmaergo: { type: "humanoid", img: avatars["Humanoid"] },
  "Thorvin Twinbeard": { type: "humanoid", img: avatars["Humanoid"] },
  "Ott Steeltoes": { type: "humanoid", img: avatars["Humanoid"] },
  Xanathar: { type: "humanoid", img: avatars["Humanoid"] },
  "Matthew Mercer": { type: "humanoid", img: avatars["Humanoid"] },
};
const folderName = "Yawning Portal";
const source = "WDH pg. 224";
let folder = game.folders.contents.find(
  (folder) => folder.type === "Actor" && folder.name === folderName
);

if (folder == undefined) {
  folder = await Folder.create(
    {
      name: folderName,
      type: "Actor",
    },
    { displaySheet: false }
  );
}

for (const [actorName, data] of Object.entries(actorNames)) {
  let actor = game.actors.getName(actorName);
  if (actor != undefined) continue;

  actor = await Actor.create(
    {
      name: actorName,
      type: "npc",
      folder: folder,
      img: data["img"],
      system: {
        details: { source: source, type: { value: data["type"] } },
      },
      prototypeToken: {
        displayName: 20,
        disposition: 0,
        texture: { src: data["img"] },
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
