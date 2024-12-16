import express from "express";
import { validator } from "../middleware/Validator.js";
import { auth } from "../middleware/Auth.js";
import {
  addMessage,
  getMessages,
} from "../controllers/user/MessageController.js";
import { createMessageRule } from "../rules/message/CreateMessageRule.js";
import { checkConversationIdRule } from "../rules/message/CheckConversationIdRule.js";

const router = express.Router();

router.post("/", [auth("user"), validator(createMessageRule)], addMessage);
router.get(
  "/:conversationId",
  [auth("user"), validator(checkConversationIdRule)],
  getMessages
);

export default router;
