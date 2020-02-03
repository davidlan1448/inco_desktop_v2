import { ipcMain } from "electron";
import { init } from "../controller/initController";

/**
 * @event init
 */
ipcMain.on("init", init);
