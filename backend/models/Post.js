import mongoose from "mongoose";
import schema from "../database/schema/PostSchema.js";

// Post Model
const PostModel = mongoose.model("Posts", schema);

export { PostModel as Post };
