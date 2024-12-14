import mongoose from "mongoose";
import schema from "../database/schema/ConversationSchema.js";

const ConversationModel = mongoose.model("Conversations", schema);

export { ConversationModel as Conversation };
