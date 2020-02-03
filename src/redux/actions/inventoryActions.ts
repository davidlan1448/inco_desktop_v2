import {
  GET_ALL_INVENTORIES,
  LOADING,
  ERROR,
  LOADING_REGISTER,
  ERROR_REGISTER,
  REGISTER_INVENTORY,
  UPDATE_INVENTORIES,
  CLEAR_RESPONSE
} from "../types/inventoriesTypes";
import { Dispatch, ReducersMapObject } from "redux";
import { ipcRenderer } from "electron";
import { Inventory } from "../../electron/entitys/Inventory";
import { socket } from "../../socket";

/**
 * @description obtiene los inventarios de el usuario
 */
export const getInventories = () => async (dispatch: Dispatch) => {
  dispatch({
    type: LOADING
  });

  ipcRenderer.removeAllListeners("onGetInventories");
  ipcRenderer.on("onGetInventories", (evt, args) => {
    const { data, success } = args;

    if (success) {
      dispatch({
        type: GET_ALL_INVENTORIES,
        payload: data
      });
    } else {
      dispatch({
        type: ERROR,
        payload: args.error_code
      });
    }
  });

  ipcRenderer.send("getInventories");
};

/**
 * @description obtiene los inventarios de el usuario
 */
export const registerInventory = (
  inventory: Inventory,
  idUser: number
) => async (dispatch: Dispatch, getState: any) => {
  dispatch({
    type: LOADING_REGISTER
  });

  const { inventories } = getState().inventoryReducer;

  ipcRenderer.once("onRegisterInventory", (evt, args) => {
    const { data, success } = args;
    
    if (success) {
      socket.emit("createInventories", [ data.map((i: any) => i.idInventory),idUser]);

      const update_inventories = [...inventories, ...data];

      dispatch({
        type: REGISTER_INVENTORY,
        payload: args
      });

      dispatch({
        type: UPDATE_INVENTORIES,
        payload: update_inventories
      });

      dispatch({
        type: CLEAR_RESPONSE
      });
    } else {
      dispatch({
        type: ERROR_REGISTER,
        payload: args.error_code
      });
    }
  });

  const inventoryClass = new Inventory();
  inventoryClass.idUser = idUser;
  inventoryClass.inventoryName = inventory.inventoryName;
  inventoryClass.dateRegister = new Date();
  inventoryClass.dateUpdate = new Date();
  inventoryClass.sync = 0;
  
  ipcRenderer.send("registerInventory", inventoryClass);
};

/**
 * @description actualiza los inventarios por el evento socket
 * @param inventoriesSocket
 */
export const updateInventoriesSocket = (
  inventoriesSocket: Inventory[]
) => async (dispatch: Dispatch, getState: any) => {
  const { inventories } = getState().inventoryReducer;

  const inventoriesSave = inventoriesSocket.map((inventory: any) => {
    const inventoryClass = new Inventory();
    inventoryClass.idInventory = inventory.id_inventory;
    inventoryClass.idUser = inventory.owner.id_owner;
    inventoryClass.inventoryName = inventory.inventory_name;
    inventoryClass.dateRegister = new Date();
    inventoryClass.dateUpdate = new Date();
    inventoryClass.sync = 1;
    return inventoryClass;
  });
  
  ipcRenderer.once("onRegisterInventory", (evt, args) => {
    const { data } = args;

    const update_inventories = [...inventories, ...data].filter((inventory: Inventory, index: number) => {
      return inventories.indexOf(inventory) === index;
    });

    dispatch({
      type: UPDATE_INVENTORIES,
      payload: update_inventories
    });
  });

  ipcRenderer.send("registerInventory", inventoriesSave);
};
