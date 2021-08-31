const socket = io("/");

socket.on("connect", () => {
  console.log("succesfully connected to socket.io server");
  console.log(socket.id);
});
