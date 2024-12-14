import authRoutes from "../routes/Auth.js";
import userRoutes from "../routes/User.js";
import postRoutes from "../routes/Post.js";
import express from "express";
import path from "path";

// Register app routes
const registerRoutes = (app) => {
  app.use("/", authRoutes);
  app.use("/users", userRoutes);
  app.use("/posts", postRoutes);
  // Return static files from 'public' directory.
  app.use("/public", express.static(path.join(path.resolve(), "public")));
};

export default registerRoutes;
