import * as wss from "./wss.js";
import * as store from "./store.js";
import * as constants from "./constants.js";
import * as ui from "./ui.js";
let connectedUserDetails;
const defaultConstraints = {
  audio: true,
  video: true,
};
export const getLocalPreview = () => {
  navigator.mediaDevices
    .getUserMedia(defaultConstraints)
    .then((stream) => {
      ui.updateLocalVideo(stream);
      store.setLocalStream(stream);
    })
    .catch((err) => {
      console.log(err);
    });
};
export const sendPreOffer = (callType, calleePersonalCode) => {
  connectedUserDetails = {
    socketId: calleePersonalCode,
    callType,
  };
  if (
    callType === constants.callType.CHAT_PERSONAL_CODE ||
    callType === constants.callType.VIDEO_PERSONAL_CODE
  ) {
    const data = {
      callType,
      calleePersonalCode,
    };
    ui.showCallingDial(callingDialRejectCallHandler);
    wss.sendPreOffer(data);
  }
};

export const handlePreOffer = (data) => {
  const {callType, callerSocketId} = data;
  connectedUserDetails = {
    socketId: callerSocketId,
    callType,
  };
  if (
    callType === constants.callType.CHAT_PERSONAL_CODE ||
    callType === constants.callType.VIDEO_PERSONAL_CODE
  ) {
    ui.showIncomingCallDial(callType, acceptCallHandler, rejectCallHandler);
  }
};
const acceptCallHandler = () => {
  console.log("call accepted");
  sendPreOfferAnswer(constants.preOfferAnswer.CALL_ACCEPTED);
  ui.showCallElements(connectedUserDetails.callType);
};
const rejectCallHandler = () => {
  console.log("call rejected");
  sendPreOfferAnswer(constants.preOfferAnswer.CALL_REJECTED);
};
const callingDialRejectCallHandler = () => {
  console.log("rejecting call");
};

const sendPreOfferAnswer = (preOfferAnswer) => {
  const data = {
    callerSocketId: connectedUserDetails.socketId,
    preOfferAnswer,
  };
  ui.removeAllDials();
  wss.sendPreOfferAnswer(data);
};

export const handlePreOfferAnswer = (data) => {
  const {preOfferAnswer, callerSocketId} = data;
  ui.removeAllDials();
  if (preOfferAnswer === constants.preOfferAnswer.CALLEE_NOT_FOUND) {
    //dial with callee not found
    ui.showInfoDialog(preOfferAnswer);
  }
  if (preOfferAnswer === constants.preOfferAnswer.CALL_UNAVAILABLE) {
    //show dial that user is busy not able to answer
    ui.showInfoDialog(preOfferAnswer);
  }
  if (preOfferAnswer === constants.preOfferAnswer.CALL_REJECTED) {
    //show dial that call is rejected
    ui.showInfoDialog(preOfferAnswer);
  }
  if (preOfferAnswer === constants.preOfferAnswer.CALL_ACCEPTED) {
    //send webrtc offer
    ui.showCallElements(connectedUserDetails.callType);
  }
};
