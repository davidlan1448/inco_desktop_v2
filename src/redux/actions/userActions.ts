import {
  LOGIN,
  LOADING,
  ERROR,
  REGISTER,
  REGISTER_ERROR,
  REGISTER_LOADING,
  REGISTER_CLEAN,
  LOGIN_CLEAN,
  LOADING_USER_LOGGED
} from "../types/usuariosTypes";
import { Dispatch } from "redux";
import { ipcRenderer } from "electron";
import { useHistory } from "react-router-dom";
import { socket } from "../../socket";

/**
 * @description loguea un usuario
 * @param user
 */
export const getUserLogged = () => async (dispatch: Dispatch) => {
  dispatch({
    type: LOADING_USER_LOGGED
  });

  ipcRenderer.once("onGetUserLogged", (evt, args) => {
    const { data, success } = args;
    
    if (success) {
      dispatch({
        type: LOGIN,
        payload: data
      });
    } else {
      dispatch({
        type: ERROR,
        payload: args
      });
    }

  });

  ipcRenderer.send("getUserLogged");
};

/**
 * @description loguea un usuario
 * @param user
 */
export const login = (user: any) => async (dispatch: Dispatch) => {
  dispatch({
    type: LOADING
  });

  ipcRenderer.once("onLogin", (evt, args) => {
    const { data, success } = args;
    
    if (success) {
      socket.emit("createUserRoom", data.idUser)
      dispatch({
        type: LOGIN,
        payload: data
      });
    } else {
      dispatch({
        type: ERROR,
        payload: args
      });
      dispatch({
        type: LOGIN_CLEAN
      });
    }

  });

  ipcRenderer.send("login", user);
};

/**
 * @description loguea un usuario
 * @param user
 */
export const logout = (history: any) => async (dispatch: Dispatch) => {
  ipcRenderer.once("onLogout", (evt, args) => {
    dispatch({
      type: LOGIN_CLEAN
    });

    history.push(`/login`)
  });

  ipcRenderer.send("logout");
}

/**
 * @description registra un usuario
 * @param user
 */
export const register = (user: any) => async (dispatch: Dispatch) => {
  dispatch({
    type: REGISTER_LOADING
  });

  ipcRenderer.once("onRegister", (evt, args) => {
    const { data, success } = args;

    if (success) {
      dispatch({
        type: REGISTER,
        payload: args
      });
    } else {
      dispatch({
        type: REGISTER_ERROR,
        payload: args
      });
    }

    dispatch({
      type: REGISTER_CLEAN
    });
  });

  ipcRenderer.send("register", user);
};
