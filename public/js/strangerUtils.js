import * as wss from "./wss.js";
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
  console.log(data);
};
