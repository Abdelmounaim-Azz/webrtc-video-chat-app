import * as store from "./store.js";
import * as wss from "./wss.js";
import * as webRTCHandler from "./webRTCHandler.js";
import * as constants from "./constants.js";

//Initialize the socket io connection
const socket = io("/");
wss.registerSocketEvents(socket);
webRTCHandler.getLocalPreview();
//copy btn functionnality
const personalCodeCopyBtn = document.getElementById(
  "personal_code_copy_button"
);
personalCodeCopyBtn.addEventListener("click", () => {
  const personalCode = store.getState().socketId;
  navigator.clipboard && navigator.clipboard.writeText(personalCode);
});

//chat and video buttons functionnality
const personalCodeChatBtn = document.getElementById(
  "personal_code_chat_button"
);
const personalCodeVideoBtn = document.getElementById(
  "personal_code_video_button"
);
personalCodeChatBtn.addEventListener("click", () => {
  console.log("chat btn clicked");
  const calleePersonalCode = document.getElementById(
    "personal_code_input"
  ).value;
  const callType = constants.callType.CHAT_PERSONAL_CODE;
  webRTCHandler.sendPreOffer(callType, calleePersonalCode);
});
personalCodeVideoBtn.addEventListener("click", () => {
  console.log("video btn clicked");
  const calleePersonalCode = document.getElementById(
    "personal_code_input"
  ).value;
  const callType = constants.callType.VIDEO_PERSONAL_CODE;

  webRTCHandler.sendPreOffer(callType, calleePersonalCode);
});
