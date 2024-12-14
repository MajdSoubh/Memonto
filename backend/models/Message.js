import mongoose from "mongoose";
import schema from "../database/schema/MessageSchema.js";

const MessageModel = mongoose.model("Messages", schema);

export { MessageModel as Message };
