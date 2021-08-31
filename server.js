const express = require("express");
const http = require("http");
const PORT = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server);
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});
let connClients = [];
io.on("connection", (socket) => {
  connClients.push(socket.id);
  console.log(connClients);
  socket.on("disconnect", () => {
    console.log("client disconnected");
    const newConnClients = connClients.filter((peerSocketId) => {
      peerSocketId !== socket.id;
    });
    connClients = newConnClients;
    console.log(connClients);
  });
});
server.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
