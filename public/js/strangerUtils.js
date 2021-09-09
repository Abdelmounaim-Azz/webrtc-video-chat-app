import * as wss from "./wss.js";
export const strangerConnStatus = (status) => {
  const data = {status};
  wss.changeStrangerConnStatus(data);
};
