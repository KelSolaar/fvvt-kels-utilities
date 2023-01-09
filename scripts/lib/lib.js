import {
    Constants
} from "./Constants.js";

function log(message) {
    console.log(`%c${Constants.moduleName}%c | ` + message, "color:#efc160", "color:#bbbbbb");
};
class KelsUtilities {
    constructor() {
        this.Constants = Constants;
        this.log = log;

        this.hookTurnIntoItemPiles = undefined;
    };

    tableResultToEquipmentQuality(tableResult) {
        const range = tableResult.results[0].range;

        for (const equipmentQuality of Constants.equipmentQuality) {
            if (equipmentQuality.range.toString() == range.toString()) {
                return equipmentQuality;
            }
        };
    };

    async registerHookTurnIntoItemPiles() {
        const pack = `${Constants.moduleName}.${Constants.packs.rollTables}`;
        const tableEquipmentQuality = await game.packs.get(pack).getDocument(Constants.rolltableIds.equipmentQuality)

        this.hookTurnIntoItemPiles = Hooks.on("item-piles-turnIntoItemPiles", async (tokenUpdateGroups, actorUpdateGroups) => {
            for (let [key, tokenUpdates] of Object.entries(tokenUpdateGroups)) {
                for (let tokenUpdate of tokenUpdates) {
                    let token = canvas.tokens.placeables.filter((token) => token.document._id == tokenUpdate._id)[0];

                    for (let item of token.actor.items) {
                        log(`Updating ${item}`);
                        const results = await tableEquipmentQuality.roll();
                        const equipmentQuality = this.tableResultToEquipmentQuality(results);

                        await item.update({
                            "name": item.name + " " + "(" + equipmentQuality.name + ")",
                            "system.price": item.system.price * equipmentQuality.priceMultiplier
                        });
                    }
                }
            }
        });

        return this.hookTurnIntoItemPiles;
    };

    async unregisterHookTurnIntoItemPiles() {
        if (this.hookTurnIntoItemPiles != undefined) {
            Hooks.off("item-piles-turnIntoItemPiles", this.hookTurnIntoItemPiles);
            this.hookTurnIntoItemPiles = undefined;
        }
    };
};

export {
    log,
    KelsUtilities
};