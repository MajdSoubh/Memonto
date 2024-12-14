import express from "express";
import { validator } from "../middleware/validator.js";
import { checkUserIdRule } from "../rules/user/CheckUserIdRule.js";
import { auth } from "../middleware/Auth.js";
import { updateUserRule } from "../rules/user/UpdateUserRule.js";
import { updateUser } from "../controllers/user/UserController.js";
import multer from "multer";
import storage from "../bootstrap/Storage.js";

const router = express.Router();
const upload = multer({ storage: storage.profile });

router.get("/", auth("user"), getAllUsers);
router.get("/:id", [auth("user"), validator(checkUserIdRule)], getUser);

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

export default router;
