import { IpcMainEvent } from "electron";
import axios from "axios";
import { createUrl } from "../utils/createUrl";
import APIUser from "../API/APIUser";
import { Response } from "../utils/Response";
import { getRepository } from "typeorm";
import { User } from "../entitys/User";
import { Debug } from "../utils/Debug";

const userRepo = getRepository(User)

/**
 * @description obtiene al usuario logueado
 * @param evt 
 * @param args 
 */
export const getUserLogged = async (evt: IpcMainEvent, args: any) => {
  try {
    const user = await userRepo.findOne({
      where: { authenticated: true }
    });
    
    evt.reply("onGetUserLogged", Response(true, user || ""));
  } catch (err) {
    Debug("userController", "getUserLogged", err, null, "ERROR");
    evt.reply("onGetUserLogged", Response(false, null, 0, err));

  }
}

/**
 * @description realiza el login de el usuario
 * @param evt
 * @param args
 */
export const login = async (evt: IpcMainEvent, args: any) => {
  try {
    const res: any = await APIUser.login(args);
    const { data } = res;
    const { data: dataUser } = data;
    
    const userLogin = new User();
    userLogin.idUser = dataUser.id_user;
    userLogin.username = dataUser.username;
    userLogin.name = dataUser.name;
    userLogin.lastName = dataUser.last_name;
    userLogin.email = dataUser.email;
    userLogin.dateRegister = dataUser.date_register;
    userLogin.idCoin = dataUser.coin.id_coin;
    userLogin.token = dataUser.token;
    userLogin.authenticated = true;

    const user = await userRepo.save(userLogin);

    evt.reply("onLogin", Response(true, user));
  } catch (err) {
    const { response } = err;
    evt.reply("onLogin", 
      Response(
      false,
      "",
      response ? response.data.error_code : 50200,
      response.data
    ));
  }
};

/**
 * @description desloguea un usuario
 * @param evt 
 * @param args 
 */
export const logout = async (evt: IpcMainEvent, args: any) => {
  try {
    await userRepo.update({
      authenticated: true
    }, { authenticated: false });
    
    evt.reply("onLogout", Response(true, ""));
  } catch (err) {
    const { response } = err;
    Debug("userController", "logout", err, null, "ERROR");
    evt.reply("onLogout", Response(false, response.data));
  }
};

/**
 * @description registra un usuario
 * @param evt
 * @param args
 */
export const register = async (evt: IpcMainEvent, args: any) => {
  try {
    const res = await APIUser.register(args);
    const { data } = res;
    console.log(data)

    evt.reply("onRegister", data);
  } catch (err) {
    const { response } = err;
    console.log(response)
    evt.reply(
      "onRegister",
      Response(
        false,
        null,
        response ? response.data.error_code : 50200,
        response.data
      )
    );
  }
};
