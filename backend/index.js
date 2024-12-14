import config from "config";
import express from "express";

const app = express();

const appURL = config.get("app.URL");
const appPort = config.get("app.port");

app.listen(appPort, () => console.log(`APP URL : ${appURL}`));
