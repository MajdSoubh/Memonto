import authRoutes from "../routes/Auth.js";
import userRoutes from "../routes/User.js";
import postRoutes from "../routes/Post.js";
import conversationRoutes from "../routes/Conversation.js";
import messageRoutes from "../routes/Message.js";
import express from "express";
import path from "path";

// Register app routes
const registerRoutes = (app) => {
  app.use("/", authRoutes);
  app.use("/users", userRoutes);
  app.use("/posts", postRoutes);
  app.use("/conversations", conversationRoutes);
  app.use("/messages", messageRoutes);
  // Return static files from 'public' directory.
  app.use("/public", express.static(path.join(path.resolve(), "public")));
};

export default registerRoutes;
