import { Server as SocketServer } from "socket.io";

const setupSocket = (server) => {
  const io = new SocketServer(server, {
    cors: { origin: "*" },
  });

  io.on("connection", (socket) => {
    console.log("Client connected");

    socket.on("comments", (data) => {
      io.emit("comments", data);
    });
    socket.on("deleteComments", (data) => {
      io.emit("deleteComments", data);
    });
    socket.on("editComments", (data) => {
      io.emit("editComments", data);
    });
  });
};

export default setupSocket;
