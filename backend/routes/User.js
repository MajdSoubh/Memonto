import express from "express";
import { validator } from "../middleware/validator.js";
import { checkUserIdRule } from "../rules/user/CheckUserIdRule.js";
import { auth } from "../middleware/Auth.js";
import { getUser } from "../controllers/user/UserController.js";

const router = express.Router();

router.get("/:id", [auth("user"), validator(checkUserIdRule)], getUser);

export default router;
