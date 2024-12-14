import bodyParser from "body-parser";
import cors from "cors";

const allowedOrigins = ["http://localhost:5173"];
// Register app middlwares
const registerMiddlewares = (app) => {
  app.use(bodyParser.json({ limit: "10mb", extends: true }));
  app.use(bodyParser.urlencoded({ limit: "10mb", extends: true }));
  app.use(
    cors({
      origin: "*",
      credentials: true, // Allow cookies/credentials
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allowed methods
      // allowedHeaders: ["content-type", "Authorization"], // Explicit headers
      exposedHeaders: "Authorization",
    })
  );
};

export default registerMiddlewares;
