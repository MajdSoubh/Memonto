import express from "express";
import { validator } from "../middleware/validator.js";
import {
  createConversation,
  getUserConversations,
} from "../controllers/user/ConversationController.js";
import { auth } from "../middleware/Auth.js";
import { checkReceiverIdRule } from "../rules/conversation/CheckReceiverIdRule.js";
const router = express.Router();

router.post(
  "/",
  [auth("user"), validator(checkReceiverIdRule)],
  createConversation
);
router.get("/", auth("user"), getUserConversations);
// router.get("/find/:firstId/:secondId", findChat);

export default router;
