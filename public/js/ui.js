import * as constants from "./constants.js";
import * as elements from "./elements.js";
export const updatePersonalCode = (personalCode) => {
  const personalCodepara = document.getElementById("personal_code_paragraph");
  personalCodepara.innerHTML = personalCode;
};
export const showIncomingCallDial = (
  callType,
  acceptCallHandler,
  rejectCallHandler
) => {
  const callTypeInfo =
    callType === constants.callType.CHAT_PERSONAL_CODE ? "Chat" : "Video";
  const incomingCallDial = elements.getIncomingCallDial();
};
