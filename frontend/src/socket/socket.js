import { io } from "socket.io-client";
const socketURL = import.meta.env.VITE_SOCKET_URL;
let socket;

export const establishSocketConnection = (userId) => {
  if (socket?.connected) return socket;
  socket = io(socketURL, {
    reconnection: true,
    reconnectionAttempts: Infinity,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
  });

  socket.on("connect", () => registerUser(userId));
  socket.on("reconnect", () => registerUser(userId));

  return socket;
};

export const registerUser = (userId) => {
  if (socket) socket.emit("registerUser", userId);
};

// Listen for received messages
export const onReceiveMessage = (callback) => {
  if (socket)
    socket.on("receiveMessage", (message) => {
      callback(message);
    });
};

// Disconnect the socket
export const disconnect = () => {
  if (socket) socket.disconnect();
};
