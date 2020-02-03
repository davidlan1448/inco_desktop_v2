import { ipcMain } from "electron";
import { getAllCoins } from "../controller/coinController";

/**
 * @event getCoins
 */
ipcMain.on("getCoins", getAllCoins);