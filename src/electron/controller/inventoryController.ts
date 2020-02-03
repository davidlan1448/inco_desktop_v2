import { APIInventory } from "../API/APIInventory";
import { IpcMainEvent } from "electron";
import { Debug } from "../utils/Debug";
import { Response } from "../utils/Response";
import { User } from "../entitys/User";
import { getRepository } from "typeorm";
import { Inventory } from "../entitys/Inventory";
import isOnline from "is-online";

const inventoryRepo = getRepository(Inventory);

/**
 * @description obtiene los inventarios de el usuario
 * @param evt
 * @param args
 */
export const getInventories = async (evt: IpcMainEvent, args: any) => {
  try {
    get(evt);
    const user = await User.getID();
    if (!user) return;

    const res = await APIInventory.getInventories(user.ID);
    const {
      data: { data }
    } = res;
    const inventories = data.map((i: any) => {
      const { id_inventory, inventory_name, date_update, date_register } = i;
      const inventory = new Inventory();
      inventory.idInventory = id_inventory;
      inventory.idUser = user.ID;
      inventory.inventoryName = inventory_name;
      inventory.dateRegister = date_register;
      inventory.dateUpdate = date_update;
      inventory.sync = 1;
      return inventory;
    });

    await inventoryRepo.save(inventories);
    get(evt);
  } catch (err) {
    const { response } = err;

    Debug(
      "inventoryController",
      "getInventories",
      response.data,
      null,
      "ERROR"
    );
    get(evt, err.response);
  }
};

/**
 * @description registra un inventario en la base de datos local
 * @param evt
 * @param args
 */
export const registerInventory = async (
  evt: IpcMainEvent,
  args: Inventory[]
) => {
  try {
    const inventories = await inventoryRepo.save(args);
    const is_online = await isOnline();

    if (Array.isArray(args)) {
      evt.reply("onRegisterInventory", Response(false, args, 50200));
      return;
    }

    if (is_online) {
      syncInventories(evt);
    } else {
      evt.reply("onRegisterInventory", Response(false, inventories, 50200));
    }
  } catch (err) {
    Debug("inventoryController", "registerInventory", err, null, "ERROR");
  }
};

/**
 * @description sincroniza los inventarios que estan registrados de forma local
 * @param evt
 * @param init
 */
export const syncInventories = async (
  evt: IpcMainEvent,
  init: boolean = false
) => {
  try {
    const { ID } = await User.getID();
    const inventoriesSync = await inventoryRepo.find({
      select: ["idUser", "inventoryName", "dateUpdate", "dateRegister"],
      where: { idUser: ID, sync: 0 }
    });

    if (inventoriesSync.length === 0 && !init) {
      evt.reply("onRegisterInventory", Response(false, null, 55));
      return;
    }

    const res = await APIInventory.registerMulty(inventoriesSync);
    const { data } = res;

    const inventories = await inventoryRepo.find({
      where: { idUser: ID, sync: 0 }
    });

    const newData = data.data.map((id: number, index: number) => {
      return {
        ...inventories[index],
        sync: 1,
        idInventory: id,
        idOld: inventories[index].idInventory
      };
    });

    for (const inventory of newData) {
      const idInventory = inventory.idOld;
      await inventoryRepo.update({ idInventory }, {
        idInventory: inventory.idInventory,
        sync: 1
      });
    }

    if (!init)
      evt.reply(
        "onRegisterInventory",
        Response(
          true,
          newData.map((inventory: any) => {
            delete inventory.idOld;
            return inventory;
          })
        )
      );
  } catch (err) {
    const { response } = err;
    let responseReply: any = null;

    Debug("inventoryController", "syncInventories", err, null, "ERROR");
    if (!response) {
      responseReply = Response(false, null, 50200);
    } else {
      responseReply = Response(false, response.data, response.data.error_code);
    }

    evt.reply("onRegisterInventory", responseReply);
  }
};

const get = async (evt: IpcMainEvent, err: any = null) => {
  const user = await User.getID();
  if (!user) return;
  const inventarios = await inventoryRepo.find({ where: { idUser: user.ID } });

  evt.reply("onGetInventories", Response(true, inventarios));
};
