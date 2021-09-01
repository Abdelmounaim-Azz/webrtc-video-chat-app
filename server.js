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
  socket.on("pre-offer", (data) => {
    const {callType, calleePersonalCode} = data;
    const connectedPeer = connClients.find(
      (peerSocketId) => peerSocketId === calleePersonalCode
    );
    if (connectedPeer) {
      const data = {
        callerSocketId: socket.id,
        callType,
      };
      io.to(calleePersonalCode).emit("pre-offer", data);
    }
  });
  socket.on("pre-offer-answer", (data) => {
    const {preOfferAnswer, callerSocketId} = data;
    const connectedPeer = connClients.find(
      (peerSocketId) => peerSocketId === callerSocketId
    );
    if (connectedPeer) {
      io.to(callerSocketId).emit("pre-offer-answer", data);
    }
  });
  socket.on("disconnect", () => {
    console.log("client disconnected");
    const newConnClients = connClients.filter(
      (peerSocketId) => peerSocketId !== socket.id
    );
    connClients = newConnClients;
  });
});
server.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
