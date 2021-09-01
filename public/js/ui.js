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
  const incomingCallDial = elements.getIncomingCallDial(
    callTypeInfo,
    acceptCallHandler,
    rejectCallHandler
  );
  const dialog = document.getElementById("dialog");
  dialog.querySelectorAll("*").forEach((dialog) => dialog.remove());
  dialog.appendChild(incomingCallDial);
};
export const showCallingDial = (rejectCallHandler) => {
  const callingDial = elements.getCallingDial(rejectCallHandler);
  const dialog = document.getElementById("dialog");
  dialog.querySelectorAll("*").forEach((dialog) => dialog.remove());
  dialog.appendChild(callingDial);
};

export const removeAllDials = () => {
  const dialog = document.getElementById("dialog");
  dialog.querySelectorAll("*").forEach((dialog) => dialog.remove());
};

export const showInfoDial = (preOfferAnswer) => {
  let infoDial = null;
  if (preOfferAnswer === constants.preOfferAnswer.CALL_REJECTED) {
    infoDial = elements.getInfoDial(
      "Call Rejected",
      "Callee rejected your call"
    );
  }
  if (preOfferAnswer === constants.preOfferAnswer.CALLEE_NOT_FOUND) {
    infoDial = elements.getInfoDial(
      "Call Rejected",
      "Callee rejected your call"
    );
  }
  if (preOfferAnswer === constants.preOfferAnswer.CALL_UNAVAILABLE) {
    infoDial = elements.getInfoDial(
      "Call is not possible now.",
      "Callee is busy.please try another time."
    );
  }
  if (infoDial) {
    const dial = document.getElementById("dialog");
    dial.appendChild(infoDial);
    setTimeout(() => {
      removeAllDials();
    }, [4000]);
  }
};
