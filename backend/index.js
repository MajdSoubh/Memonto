import config from "config";
import express from "express";
import registerMiddlewares from "./bootstrap/Middlewares.js";
import { registerSocket } from "./bootstrap/Socket.js";
import "./bootstrap/Database.js";

const app = express();

registerMiddlewares(app);
registerSocket(app);
const appURL = config.get("app.URL");
const appPort = config.get("app.port");

app.listen(appPort, () => console.log(`APP URL : ${appURL}`));
