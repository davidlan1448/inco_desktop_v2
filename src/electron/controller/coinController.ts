import { IpcMainEvent } from "electron";
import { Debug } from "../utils/Debug";
import APICoin from "../API/APICoin";
import { getRepository } from "typeorm";
import { Coin } from "../entitys/Coin";
import { Response } from "../utils/Response";

const coinRepo = getRepository(Coin);

/**
 * @description obtiene todas las monedas disponibles
 * @param evt 
 * @param args 
 */
const getAllCoins = async (evt: IpcMainEvent, args: any) => {
    try {
        get(evt);

        const res = await APICoin.getCoins();
        const { data: { data } } = res;

        console.log(data)

        await coinRepo.save(data);

        get(evt)
    } catch (err) {
        const { response: { data } } = err;
        get(evt);
        Debug("coinController", "getAllCoins", err.response, null, "ERROR");
    }
}

const get = async (evt: IpcMainEvent) => {
    const coins = await coinRepo.find();
    evt.reply("onGetCoins", Response(coins.length > 0, coins));
}

export {
    getAllCoins
}