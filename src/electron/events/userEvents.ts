import { ipcMain } from "electron";
import { login, register, getUserLogged, logout } from "../controller/userController";

/**
 * @evt login
 */
ipcMain.on("login", login);

/**
 * @evt register
 */
ipcMain.on("register", register);

/**
 * @evt getUserLogged
 */
ipcMain.on("getUserLogged", getUserLogged);

/**
 * @evt logout
 */
ipcMain.on("logout", logout);
