import * as store from "./store.js";
import * as wss from "./wss.js";

//Initialize the socket io connection
const socket = io("/");
wss.registerSocketEvents(socket);

//register event for the personal code copy btn
const personalCodeCopyBtn=document.getElementById('personal_code_copy_button');
personalCodeCopyBtn.addEventListener('click',()=>{
  const personalCode=store.getState().socketId;
  navigator.clipboard && navigator.clipboard.writeText(personalCode);
})