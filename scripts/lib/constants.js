const Constants = {
  moduleName: "kels-utilities",
  path: undefined,
  packs: {
    rollTables: "kels-utilities-roll-tables",
  },
  rolltableIds: {
    equipmentQuality: "DaIPaRPlgaMofa0X",
  },
  equipmentQuality: [
    {
      name: "Superb",
      description: 'Price multiplier for a "superb" looted item.',
      priceMultiplier: 1.5,
      range: [1, 2],
    },
    {
      name: "Almost New",
      description: 'Price multiplier for an "almost new" looted item.',
      priceMultiplier: 1.0,
      range: [3, 5],
    },
    {
      name: "Low Quality, Poorly Made, High Use",
      description:
        'Price multiplier for a "low quality, poorly made, high use" looted item.',
      priceMultiplier: 0.5,
      range: [6, 55],
    },
    {
      name: "Terrible Quality, Cracked, Warped",
      description:
        'Price multiplier for a "terrible quality, cracked, warped" looted item.',
      priceMultiplier: 0.1,
      range: [56, 65],
    },
    {
      name: "Destroyed",
      description: 'Price multiplier for a "destroyed" looted item.',
      priceMultiplier: 0.0,
      range: [66, 100],
    },
  ],
};
Constants.path = `modules/${Constants.moduleName}/`;

export { Constants };
