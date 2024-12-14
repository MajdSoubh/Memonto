import express from "express";
import { validator } from "../middleware/validator.js";
import { checkUserIdRule } from "../rules/user/CheckUserIdRule.js";
import { auth } from "../middleware/Auth.js";
import { updateUserRule } from "../rules/user/UpdateUserRule.js";
import { followUserRule } from "../rules/user/FollowUserRule.js";
import {
  deleteUser,
  followUser,
  getAllUsers,
  getFollowingSuggestion,
  getUser,
  searchForUser,
  unfollowUser,
  updateUser,
} from "../controllers/user/UserController.js";
import multer from "multer";
import storage from "../bootstrap/Storage.js";
import { querySearchRule } from "../rules/user/QuerySearchRule.js";

const router = express.Router();
const upload = multer({ storage: storage.profile });

router.get("/", auth("user"), getAllUsers);
router.get("/following-suggestions", auth("user"), getFollowingSuggestion);
router.get("/:id", [auth("user"), validator(checkUserIdRule)], getUser);
router.post(
  "/search",
  [auth("user"), validator(querySearchRule)],
  searchForUser
);
router.put(
  "/follow/:id",
  [auth("user"), validator(followUserRule)],
  followUser
);
router.put(
  "/unfollow/:id",
  [auth("user"), validator(followUserRule)],
  unfollowUser
);
router.put(
  "/",
  [
    auth("user"),
    upload.fields([
      { name: "avatar", maxCount: 1 },
      { name: "backgroundImage", maxCount: 1 },
    ]),
    validator(updateUserRule),
  ],
  updateUser
);
router.delete("/", auth("user"), deleteUser);

export default router;
