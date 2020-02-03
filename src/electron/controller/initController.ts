import { User } from "../entitys/User";
import { Debug } from "../utils/Debug";
import { IpcMainEvent } from "electron";
import { syncInventories } from "./inventoryController";
import { getAllCoins } from "./coinController";

/**
 * @description
 * @param evt
 * @param args
 */
export const init = async (evt: IpcMainEvent, args: any) => {
  try {
    const user = await User.getID();

    await getAllCoins(evt, null);

    if (user) {
      await syncInventories(evt);
    }

    evt.reply("onInit", true);
  } catch (err) {
    Debug("initController", "init", err, null, "ERROR");
    evt.reply("onInit", true);
  }
};
