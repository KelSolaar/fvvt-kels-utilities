/*
Create a clothing item according to "Aurora's Whole Realms Spring Catalogue".
https://www.dmsguild.com/product/347200/Auroras-Whole-Realms-Spring-Catalogue
*/

const folderName = "Aurora's Whole Realms Spring Catalogue";
const source = "Aurora's Whole Realms Spring Catalogue pg. 18";

const clothing = {
  "Yard of Material": { price: 6, weight: 1 },
  Underwear: { price: 0.5, weight: 0.1 },
  Undershirt: { price: 1, weight: 0.2 },
  Boots: { price: 10, weight: 0.6 },
  Shirt: { price: 1.4, weight: 0.4 },
  Skirt: { price: 1.4, weight: 0.4 },
  Breeches: { price: 1.4, weight: 0.4 },
  "Long Undershirt": { price: 1.4, weight: 0.4 },
  Belt: { price: 0.7, weight: 0.1 },
  Sash: { price: 0.7, weight: 0.1 },
  Coat: { price: 4, weight: 0.8 },
  Jacket: { price: 4, weight: 0.8 },
  Cloak: { price: 2, weight: 1 },
  Hood: { price: 1, weight: 0.2 },
  Cap: { price: 1, weight: 0.2 },
  Headdress: { price: 1, weight: 0.2 },
  Scarf: { price: 1, weight: 0.2 },
  Hose: { price: 0.2, weight: 0.4 },
  Shoes: { price: 5, weight: 0.5 },
  Slippers: { price: 5, weight: 0.5 },
  Gown: { price: 5, weight: 3 },
  Tunic: { price: 5, weight: 3 },
};

const material = {
  Canvas: { priceMultiplier: 0.1, weightMultiplier: 0.75 },
  Cotton: { priceMultiplier: 1.25, weightMultiplier: 0.75 },
  "Thin Leather": { priceMultiplier: 0.25, weightMultiplier: 1.25 },
  "Thick Leather": { priceMultiplier: 0.75, weightMultiplier: 2 },
  Linen: { priceMultiplier: 1.25, weightMultiplier: 0.75 },
  Silk: { priceMultiplier: 1.5, weightMultiplier: 0.5 },
  "Spider Silk": { priceMultiplier: 2.5, weightMultiplier: 0.25 },
  Wool: { priceMultiplier: 1, weightMultiplier: 1 },
};

const dye = {
  Common: { priceMultiplier: 1, weightMultiplier: 1 },
  Rare: { priceMultiplier: 10, weightMultiplier: 1 },
};

const quality = {
  Common: { priceMultiplier: 0.9, weightMultiplier: 1.45 },
  Fine: { priceMultiplier: 10, weightMultiplier: 1 },
  Fitted: { priceMultiplier: 1, weightMultiplier: 1 },
};

const decoration = {
  None: { priceMultiplier: 1, weightMultiplier: 1 },
  Embroidery: { priceMultiplier: 1.5, weightMultiplier: 1.45 },
  Fur: { priceMultiplier: 2, weightMultiplier: 1 },
  "Semi-Precious Stones": { priceMultiplier: 4, weightMultiplier: 1 },
};

const oiled = {
  None: { priceMultiplier: 1, weightMultiplier: 1 },
  "Leather Oil or Wax": { priceMultiplier: 1.25, weightMultiplier: 1.25 },
};

function round(number) {
  return Math.round(number * 100) / 100;
}

function getClothingItemData(html) {
  const selectedClothing = html[0].querySelector("#select-clothing").value;
  let clothingData = {
    price: clothing[selectedClothing].price,
    weight: clothing[selectedClothing].weight,
  };

  const selectedMaterial = html[0].querySelector("#select-material").value;
  let materialData = material[selectedMaterial];
  clothingData.price *= materialData.priceMultiplier;
  clothingData.weight *= materialData.weightMultiplier;

  const selectedDye = html[0].querySelector("#select-dye").value;
  let dyeData = dye[selectedDye];
  clothingData.price *= dyeData.priceMultiplier;
  clothingData.weight *= dyeData.weightMultiplier;

  const selectedQuality = html[0].querySelector("#select-quality").value;
  let qualityData = quality[selectedQuality];
  clothingData.price *= qualityData.priceMultiplier;
  clothingData.weight *= qualityData.weightMultiplier;

  const selectedDecoration = html[0].querySelector("#select-decoration").value;
  let decorationData = decoration[selectedDecoration];
  clothingData.price *= decorationData.priceMultiplier;
  clothingData.weight *= decorationData.weightMultiplier;

  const selectedOiled = html[0].querySelector("#select-oiled").value;
  let oiledData = oiled[selectedOiled];
  clothingData.price *= oiledData.priceMultiplier;
  clothingData.weight *= oiledData.weightMultiplier;

  return {
    clothing: selectedClothing,
    material: selectedMaterial,
    dye: selectedDye,
    quality: selectedQuality,
    decoration: selectedDecoration,
    oiled: selectedOiled,
    price: clothingData.price,
    weight: clothingData.weight,
  };
}

function describeClothingItem(clothingItemData) {
  let description = `${clothingItemData.clothing} made of `;

  if (clothingItemData.oiled != "None") {
    description = description + "oiled ";
  }

  description =
    description +
    `${clothingItemData.quality} quality ${clothingItemData.material} 
    dyed with ${clothingItemData.dye} pigments`;
  description = description.toLowerCase();

  if (["a", "e", "i", "o", "u"].includes(description.charAt(0))) {
    description = "An " + description;
  } else {
    description = "A " + description;
  }

  if (clothingItemData.decoration != "None") {
    description =
      description + `, and decorated with ${clothingItemData.decoration}`;
  }

  return (
    description.charAt(0).toUpperCase() + description.substring(1).toLowerCase()
  );
}

async function createClothingItem(html) {
  const clothingItemData = getClothingItemData(html);
  const description = describeClothingItem(clothingItemData) + ".";

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

  return (item = await Item.create(
    {
      name: clothingItemData.clothing,
      type: "equipment",
      folder: folder,
      system: {
        armor: {
          type: "clothing",
        },
        price: {
          value: round(clothingItemData.price),
          denomination: "sp",
        },
        weight: round(clothingItemData.weight),
        description: { value: description },
        source: source,
      },
      permission: {
        default: CONST.DOCUMENT_PERMISSION_LEVELS.LIMITED,
      },
    },
    {
      displaySheet: false,
    }
  ));
}

async function handleEvents(html) {
  html.change(function (event) {
    const clothingItemData = getClothingItemData(html);
    html.find("#input-price").val(`${round(clothingItemData.price)} sp`);
    html.find("#input-weight").val(`${round(clothingItemData.weight)} lb.`);
  });
}

function createDialog(token) {
  const form = `
  <form>
      <div class="form-group">
          <label for="select-clothing">Clothing</label>
          <select class="form-control" name="select-clothing" id="select-clothing">
              <option value="Yard of Material" selected="true" id="select-clothing-0">Yard of Material</option>
              <option value="Underwear" id="select-clothing-1">Underwear</option>
              <option value="Undershirt" id="select-clothing-2">Undershirt</option>
              <option value="Boots" id="select-clothing-3">Boots</option>
              <option value="Shirt" id="select-clothing-4">Shirt</option>
              <option value="Skirt" id="select-clothing-5">Skirt</option>
              <option value="Breeches" id="select-clothing-6">Breeches</option>
              <option value="Long Undershirt" id="select-clothing-7">Long Undershirt</option>
              <option value="Belt" id="select-clothing-8">Belt</option>
              <option value="Sash" id="select-clothing-9">Sash</option>
              <option value="Coat" id="select-clothing-10">Coat</option>
              <option value="Jacket" id="select-clothing-11">Jacket</option>
              <option value="Cloak" id="select-clothing-12">Cloak</option>
              <option value="Hood" id="select-clothing-13">Hood</option>
              <option value="Cap" id="select-clothing-14">Cap</option>
              <option value="Headdress" id="select-clothing-15">Headdress</option>
              <option value="Scarf" id="select-clothing-16">Scarf</option>
              <option value="Hose" id="select-clothing-17">Hose</option>
              <option value="Shoes" id="select-clothing-18">Shoes</option>
              <option value="Slippers" id="select-clothing-19">Slippers</option>
              <option value="Gown" id="select-clothing-20">Gown</option>
              <option value="Tunic" id="select-clothing-21">Tunic</option>
          </select>
      </div>
      <div class="form-group">
          <label for="select-material">Material</label>
          <select class="form-control" name="select-material" id="select-material">
              <option value="Canvas" selected="true" id="select-material-0">Canvas</option>
              <option value="Cotton" id="select-material-1">Cotton</option>
              <option value="Thin Leather" id="select-material-2">Thin Leather</option>
              <option value="Thick Leather" id="select-material-3">Thick Leather</option>
              <option value="Linen" id="select-material-4">Linen</option>
              <option value="Silk" id="select-material-5">Silk</option>
              <option value="Spider Silk" id="select-material-6">Spider Silk</option>
              <option value="Wool" id="select-material-7">Wool</option>
          </select>
      </div>
      <div class="form-group">
          <label for="select-dye">Dye</label>
          <select class="form-control" name="select-dye" id="select-dye">
              <option value="Common" selected="true" id="select-dye-0">Common</option>
              <option value="Rare" id="select-dye-1">Rare</option>
          </select>
      </div>
      <div class="form-group">
      <label for="select-quality">Quality</label>
          <select class="form-control" name="select-quality" id="select-quality">
              <option value="Common" selected="true" id="select-quality-0">Common</option>
              <option value="Fine" id="select-quality-1">Fine</option>
              <option value="Fitted" id="select-quality-2">Fitted</option>
          </select>
      </div>
      <div class="form-group">
      <label for="select-decoration">Decoration</label>
          <select class="form-control" name="select-decoration" id="select-decoration">
              <option value="None" selected="true" id="select-decoration-0">None</option>
              <option value="Embroidery" id="select-decoration-1">Embroidery</option>
              <option value="Fur" id="select-decoration-2">Fur</option>
              <option value="Semi-Precious Stones" id="select-decoration-3">Semi-Precious Stones</option>
          </select>
      </div>
      <div class="form-group">
          <label for="select-oiled">Oiled</label>
          <select class="form-control" name="select-oiled" id="select-oiled">
              <option value="None" selected="true" id="select-oiled-0">None</option>
              <option value="Leather Oil or Wax" id="select-oiled-1">Leather Oil or Wax</option>
          </select>
      </div>
      <div class="form-group">
          <label for="input-price">Price:</label>
          <input class="form-control" id="input-price" value="0.54 sp" disabled>
      </div>
      <div class="form-group">
          <label for="input-weight">Weight:</label>
          <input class="form-control" id="input-weight" value="1.09 lb." disabled>
      </div>
  </form>
  `;

  let dialog = new Dialog({
    title: "Aurora's Whole Realms Spring Catalogue - Clothing Item",
    content: form,
    render: handleEvents,
    buttons: {
      createClothingItem: {
        label: "Create Clothing Item",
        callback: async (html) => createClothingItem(html),
      },
    },
  }).render(true);

  return dialog;
}

createDialog();
