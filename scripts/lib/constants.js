const Constants = {
  moduleName: "kels-utilities",
  moduleDisplayName: "Kel's Utilities",
  path: undefined,
  packs: {
    rollTables: "kels-utilities-roll-tables",
  },
  rolltableIds: {
    equipmentQuality: "DaIPaRPlgaMofa0X",
  },
  equipmentQuality: [
    {
      name: "equipmentQualitySuperb",
      priceMultiplier: 1.5,
      range: [1, 2],
    },
    {
      name: "equipmentAlmostNew",
      priceMultiplier: 1.0,
      range: [3, 5],
    },
    {
      name: "equipmentLowQualityPoorlyMadeHighUse",
      priceMultiplier: 0.5,
      range: [6, 55],
    },
    {
      name: "equipmentTerribleQualityCrackedWarped",
      priceMultiplier: 0.1,
      range: [56, 65],
    },
    {
      name: "equipmentDestroyed",
      priceMultiplier: 0.0,
      range: [66, 100],
    },
  ],
};

Constants.path = `modules/${Constants.moduleName}`;
Constants.rootResources = `${Constants.path}/resources`;
Constants.pathJsonMonsterResources = `${Constants.rootResources}/monster_resources.json`;
Constants.pathHarvestingAndLootResources = `${Constants.rootResources}/harvesting_and_loot_resources.json`;

export { Constants };
