import { ipcMain } from "electron";
import { getGroups } from "../controller/groupController";

/**
 * @event getGroups
 */
ipcMain.on("getGroups", getGroups);
