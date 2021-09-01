import * as store from "./store.js";
import * as ui from "./ui.js";
import * as webRTCHandler from "./webRTCHandler.js";

let socketIO = null;
export const registerSocketEvents = (socket) => {
  socketIO = socket;
  socket.on("connect", () => {
    store.setSocketId(socket.id);
    ui.updatePersonalCode(socket.id);
  });
  socket.on("pre-offer", (data) => {
    webRTCHandler.handlePreOffer(data);
  });
};
export const sendPreOffer = (data) => {
  socketIO.emit("pre-offer", data);
};

export const sendPreOfferAnswer = (data) => {
  socketIO.emit("pre-offer-answer", data);
};
