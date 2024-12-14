import { User } from "../../models/User.js";
import bcrypt from "bcrypt";
import config from "config";
import { removeFile } from "../../helpers/Helpers.js";

// Get a User
export const getUser = async (req, res) => {
  const id = req.params.id;

  const user = await User.findById(id).withoutPopulation();

  if (!user) {
    return res.status(404).json({ message: "This user doesn't exist" });
  }

  res.status(200).json(user);
};

// Get all users
export const getAllUsers = async (req, res) => {
  let users = await User.find().withoutPopulation();

  res.status(200).json(users);
};
// Update a User
export const updateUser = async (req, res) => {
  if (req.body?.password) {
    req.body.password = await bcrypt.hash(
      req.body.password,
      await bcrypt.genSalt(10)
    );
  }

  const user = await User.findByIdAndUpdate(req.user.id, req.body, {
    new: true,
  });

  // Update user avatar if new avatar sent
  if (req.files?.avatar) {
    const filename =
      config.get("storage.image.profile") +
      user.get("avatar", null, { getters: false });
    removeFile(filename);
    user.avatar = req.files.avatar[0].filename;
    await user.save();
  }
  // Update background if a new background sent
  if (req.files?.backgroundImage) {
    const filename =
      config.get("storage.image.profile") +
      user.get("backgroundImage", null, { getters: false });
    removeFile(filename);
    user.backgroundImage = req.files.backgroundImage[0].filename;
    await user.save();
  }

  // Generate auth token
  const token = user.generateAuthToken();

  // Send respone
  res.header("x-auth-token", token).json(user);
};
