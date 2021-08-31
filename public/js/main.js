const socket = io("/");
socket.on("connect", () => {
  console.log("client connected to wss server");
  console.log(socket.id);
});
