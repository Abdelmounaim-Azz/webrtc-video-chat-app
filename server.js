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

let connectedPeers = [];
let connectedPeersStranger = [];

io.on("connection", (socket) => {
  connectedPeers.push(socket.id);

  socket.on("pre-offer", (data) => {
    console.log("pre-offer-came");
    const {calleePersonalCode, callType} = data;
    console.log(calleePersonalCode);
    console.log(connectedPeers);
    const connectedPeer = connectedPeers.find(
      (peerSocketId) => peerSocketId === calleePersonalCode
    );

    console.log(connectedPeer);

    if (connectedPeer) {
      const data = {
        callerSocketId: socket.id,
        callType,
      };
      io.to(calleePersonalCode).emit("pre-offer", data);
    } else {
      const data = {
        preOfferAnswer: "CALLEE_NOT_FOUND",
      };
      io.to(socket.id).emit("pre-offer-answer", data);
    }
  });

  socket.on("pre-offer-answer", (data) => {
    const {callerSocketId} = data;

    const connectedPeer = connectedPeers.find(
      (peerSocketId) => peerSocketId === callerSocketId
    );

    if (connectedPeer) {
      io.to(data.callerSocketId).emit("pre-offer-answer", data);
    }
  });

  socket.on("webRTC-signaling", (data) => {
    const {connectedUserSocketId} = data;

    const connectedPeer = connectedPeers.find(
      (peerSocketId) => peerSocketId === connectedUserSocketId
    );

    if (connectedPeer) {
      io.to(connectedUserSocketId).emit("webRTC-signaling", data);
    }
  });
  socket.on("user-hang-up", (data) => {
    const {connectedUserSocketId} = data;
    const connectedPeer = connectedPeers.find(
      (peerSocketId) => peerSocketId === connectedUserSocketId
    );

    if (connectedPeer) {
      io.to(connectedUserSocketId).emit("user-hang-up");
    }
  });
  socket.on("stranger-conn-status", (data) => {
    const {status} = data;
    if (status) {
      connectedPeersStranger.push(socket.id);
    } else {
      const newConnPeersStranger = connectedPeersStranger.filter(
        (peerSocketId) => peerSocketId !== socket.id
      );
      connectedPeersStranger = newConnPeersStranger;
    }
    console.log(connectedPeersStranger);
  });
  socket.on("get-stranger-random", () => {
    let randomStranger;
    const filteredStrangers = connectedPeersStranger.filter(
      (peerSocketId) => peerSocketId !== socket.id
    );
    if (filteredStrangers.length > 0) {
      randomStranger =
        filteredStrangers[Math.floor(Math.random() * filteredStrangers.length)];
    } else {
      randomStranger = null;
    }
    const data = {randomStranger};
    io.to(socket.id).emit("stranger-random-socket-id", randomStranger);
  });
  socket.on("disconnect", () => {
    console.log("user disconnected");

    const newConnectedPeers = connectedPeers.filter(
      (peerSocketId) => peerSocketId !== socket.id
    );

    connectedPeers = newConnectedPeers;
    const newConnPeersStranger = connectedPeersStranger.filter(
      (peerSocketId) => peerSocketId !== socket.id
    );
    connectedPeersStranger = newConnPeersStranger;
  });
});

server.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
