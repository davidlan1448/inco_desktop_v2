import socketIOClient from "socket.io-client";
import { URL_HOST } from "../app/config";

const socket = socketIOClient.connect(
  (URL_HOST || `https://www.incoinventario.com`).trim(),
  { forceNew: true }
);

const connect = (idUser: number) => {
  socket.emit("createUserRoom", idUser);
};

export { socket, connect };
