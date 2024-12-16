import express from "express";
import {
  getCurrentUser,
  login,
  register,
} from "../controllers/user/AuthController.js";
import multer from "multer";
import storage from "../bootstrap/Storage.js";
import { validator } from "../middleware/Validator.js";
import { registerRule } from "../rules/auth/RegisterRule.js";
import { loginRule } from "../rules/auth/LoginRule.js";
import { auth } from "../middleware/Auth.js";

const router = express.Router();
const upload = multer({ storage: storage.avatar });

router.post(
  "/register",
  [validator(registerRule), upload.single("avatar")],
  register
);
router.post("/login", validator(loginRule), login);
router.get("/me", auth("user"), getCurrentUser);

export default router;
