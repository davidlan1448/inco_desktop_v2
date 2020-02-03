import axios from "axios";

export class APIInventory {
  public static getInventories(ID: number) {
    return axios.get(`/inventory/user/${ID}`);
  }

  public static register(idUser: number, inventoryName: string) {
    return axios.post(`/inventory`, {
      idUser,
      inventoryName
    });
  }
  
  public static registerMulty(
    inventories: any
  ) {
    const newInventories = inventories.map((inventory: any) => {
      delete inventory.idInventory;
      return inventory;
    })
    return axios.post(`/inventory/array`, newInventories);
  }
}
