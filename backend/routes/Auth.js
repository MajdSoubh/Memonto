import express from "express";
import { register } from "../controllers/user/AuthController.js";
import multer from "multer";
import storage from "../bootstrap/Storage.js";
import { validator } from "../middleware/validator.js";
import { registerRule } from "../rules/auth/RegisterRule.js";

const router = express.Router();
const upload = multer({ storage: storage.avatar });

router.post(
  "/register",
  [validator(registerRule), upload.single("avatar")],
  register
);

export default router;
