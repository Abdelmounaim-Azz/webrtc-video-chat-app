import * as wss from "./wss.js";
import * as webRTCHandler from "./webRTCHandler.js";
import * as ui from "./ui.js";
let strangerCallType;
export const strangerConnStatus = (status) => {
  const data = {status};
  wss.changeStrangerConnStatus(data);
};
export const getSIdAndConn = (callType) => {
  strangerCallType = callType;
  wss.getStrangerSocketId();
};
export const connectWithStranger = (data) => {
  console.log(data.randomStranger);
  if (data.randomStranger) {
    webRTCHandler.sendPreOffer(strangerCallType, data.randomStranger);
  } else {
    ui.showNoStrangerDial();
  }
};
