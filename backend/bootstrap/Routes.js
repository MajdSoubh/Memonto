import authRoutes from "../routes/Auth.js";
import userRoutes from "../routes/User.js";

// Register app routes
const registerRoutes = (app) => {
  app.use("/", authRoutes);
  app.use("/users", userRoutes);
};

export default registerRoutes;
