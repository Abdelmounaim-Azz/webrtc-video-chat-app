import * as wss from "./wss.js";
import * as webRTCHandler from "./webRTCHandler.js";
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
  if (data.randomStranger) {
    webRTCHandler.sendPreOffer(strangerCallType, data.randomStranger);
  }
};
