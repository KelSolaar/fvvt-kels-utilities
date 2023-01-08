import {
    Constants
} from "./Constants.js";

function log(message) {
    console.log(`%c${Constants.moduleName}%c | ` + message, "color:#efc160", "color:#bbbbbb");
};
class KelsUtilities {
    constructor() {
        this._hookId = undefined;
    };

    async registerHookTurnIntoItemPiles() {
        const pack = `${Constants.moduleName}.${Constants.packs.rollTables}`;
        const tableEquipmentQuality = await game.packs.get(pack).getDocument(Constants.rolltableIds.equipmentQuality)
        const regex = new RegExp("[-+]?(\\d+\\.?\\d*|\\.\\d+)");

        this._hookId = Hooks.on("item-piles-turnIntoItemPiles", async (tokenUpdateGroups, actorUpdateGroups) => {
            for (let [_, tokenUpdates] of Object.entries(tokenUpdateGroups)) {
                for (let tokenUpdate of tokenUpdates) {
                    let token = canvas.tokens.placeables.filter((token) => token.document._id == tokenUpdate._id)[0];

                    for (let item of token.actor.items) {
                        log(`Updating ${item}`);
                        const results = await tableEquipmentQuality.roll();
                        let quality = results.results[0].text;
                        const multiplier = parseFloat(regex.exec(quality)[0]);
                        quality = quality.split("(")[0].trim();

                        await item.update({
                            "name": item.name + " " + "(" + quality + ")",
                            "system.price": item.system.price * multiplier
                        });
                    }
                }
            }
        });

        return this._hookId;
    };

    async unregisterHookTurnIntoItemPiles() {
        if (this._hookId != undefined) {
            Hooks.off("item-piles-turnIntoItemPiles", this._hookId);
        }
    };
};

export {
    log,
    KelsUtilities
};