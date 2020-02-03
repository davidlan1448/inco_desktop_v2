import { ipcMain } from "electron";
import { getInventories, registerInventory } from "../controller/inventoryController";

/**
 * @event getInventories
 */
ipcMain.on("getInventories", getInventories);

/**
 * @event registerInventory
 */
ipcMain.on("registerInventory", registerInventory);
