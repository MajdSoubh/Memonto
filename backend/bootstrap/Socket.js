import { createServer } from "node:http";
import { Server } from "socket.io";
import { registerEvents, setIOInstance } from "../events/Events.js";
import config from "config";

const registerSocket = (app) => {
  const socketPort = config.get("socket.port");
  const server = createServer(app);

  // Start the server
  server.listen(socketPort, () => {
    console.log(`Socket is running at Port : ${socketPort}`);
  });

  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.setMaxListeners(0);
  setIOInstance(io);
  registerEvents();
};

export { registerSocket };
