import { User } from "../models/User.js";

let _io = null;
export const setIOInstance = (io) => (_io = io);
export const registerEvents = () => {
  if (!_io) return;
  _io.on("connection", (socket) => {
    // Save user's socket ID
    socket.on("registerUser", async (userId) => {
      const user = await User.findByIdAndUpdate(userId, {
        active: true,
        socketId: socket.id,
      });
      console.log(
        `User ${userId} (${user.email}) registered with the socket ID: ${socket.id}`
      );
    });

    // Set user inactive and invalidate socketId on disconnect
    socket.on("disconnect", async () => {
      const user = await User.findOneAndUpdate(
        { socketId: socket.id },
        { active: false, socketId: null },
        { new: true }
      );
      console.log(
        `User ${user?._id} (${user?.email}) disconnected from the socket ID: ${socket.id}`
      );
    });
  });
};

export const dispatchEvent = async (receiverId, event, data) => {
  let success = false;
  if (_io) {
    const user = await User.findById(receiverId);
    if (user.socketId) {
      console.log(event, `id ${receiverId} socket:${user.socketId}`);
      _io.to(user.socketId).emit(event, data);
      success = true;
    }
  }
  return success;
};
