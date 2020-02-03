import "reflect-metadata";
import { app, BrowserWindow, dialog } from 'electron';
const path = require("path");
const url = require("url");
import { ELECTRON_START_URL } from './config';
import {createConnection, Connection, getConnection} from "typeorm";
import { PATH, createSources } from './files/createSourcesHomeDir';
import { SqliteConnectionOptions } from "typeorm/driver/sqlite/SqliteConnectionOptions";
import { Debug } from "./utils/Debug";
import { setValues } from "./utils/axiosDefaultValues";

export var win: BrowserWindow = null;

const createWindow = () => {
  win = new BrowserWindow({
    width: 813,
    minWidth: 813,
    height: 600,
    minHeight: 600,
    autoHideMenuBar: true,
    frame: false,
    webPreferences: {
      nodeIntegration: true
    }
  });

  win.on("closed", () => {
    win.destroy();
    getConnection().close();
  });

  win.webContents.openDevTools();
  win.loadURL(
    ELECTRON_START_URL || url.format({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file:',
      slashes: true
    })
  );
};

app.on("ready", async () => {
  await createSources();

  createConnection({
    type: "sqlite",
    synchronize: false,
    logging: true,
    logger: "debug",
    database: path.join(PATH, "database", "inco.sqlite"),
    entities: [__dirname + "/entitys/*{.js,.ts}"]
  })
  .then(async (connection) => {
    if (connection.isConnected) {
      require("./events/userEvents");
      require("./events/coinEvents");
      require("./events/inventoryEvents");
      require("./events/groupEvents");
      require("./events/initEvents");
      
      // setea los valores por defecto qu tendra axios
      await setValues();

      createWindow();
    }
  })
  .catch(err => {
    Debug("index", "connection", err, null, "ERROR");
    dialog.showMessageBox(win, {
      type: "error",
      message: "Error al conectarse a la base de datos"
    })
  })
});
