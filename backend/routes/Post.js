import express from "express";
import { validator } from "../middleware/Validator.js";
import {
  createPost,
  deletePost,
  fetchUserPosts,
  getPost,
  getTimelinePosts,
  reactToPost,
  updatePost,
} from "../controllers/user/PostController.js";
import { auth } from "../middleware/Auth.js";
import { updatePostRule } from "../rules/post/UpdatePostRule.js";
import { checkPostIdRule } from "../rules/post/CheckPostIdRule.js";
import multer from "multer";
import storage from "../bootstrap/Storage.js";
import { createPostRule } from "../rules/post/CreatePostRule.js";
import { checkUserIdRule } from "../rules/user/CheckUserIdRule.js";

const router = express.Router();

const upload = multer({ storage: storage.post });

router.get("/timeline", auth("user"), getTimelinePosts);
router.get(
  "/users/:id",
  [auth("user"), validator(checkUserIdRule)],
  fetchUserPosts
);
router.get("/:id", [auth("user"), validator(checkPostIdRule)], getPost);
router.put(
  "/react/:id",
  [auth("user"), validator(checkPostIdRule)],
  reactToPost
);
router.post(
  "/",
  [auth("user"), upload.array("images[]"), validator(createPostRule)],
  createPost
);
router.put("/:id", [auth("user"), validator(updatePostRule)], updatePost);
router.delete("/:id", [auth("user"), validator(checkPostIdRule)], deletePost);

export default router;
