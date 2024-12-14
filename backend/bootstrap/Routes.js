import authRoutes from "../routes/Auth.js";

// Register app routes
const registerRoutes = (app) => {
  app.use("/", authRoutes);
};

export default registerRoutes;
