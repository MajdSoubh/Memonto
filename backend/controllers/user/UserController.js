import { User } from "../../models/User.js";
import bcrypt from "bcrypt";
import config from "config";
import { removeFile } from "../../helpers/Helpers.js";
import { Types } from "mongoose";

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

// Delete a user
export const deleteUser = async (req, res) => {
  const user = await User.findByIdAndDelete(req.user.id);
  if (user?.avatar) {
    const filename =
      config.get("storage.image.profile") +
      user.get("avatar", null, { getters: false });
    removeFile(filename);
  }
  res.status(200).json({ message: "Your account has been deleted" });
};

// Follow a User
export const followUser = async (req, res) => {
  const currentUserId = req.user.id;
  const followingUserId = req.params.id;

  const currentUser = await User.findById(currentUserId).withoutPopulation();
  const followingUser = await User.findById(
    followingUserId
  ).withoutPopulation();
  if (currentUser.following.includes(followingUserId)) {
    return res.status(400).json({
      message: `You are already following ${
        followingUser.firstname + " " + followingUser.lastname
      }`,
    });
  }
  await currentUser.updateOne({ $push: { following: followingUserId } });
  await followingUser.updateOne({ $push: { followers: currentUserId } });

  res.status(200).json({
    message: `Your are following ${
      followingUser.firstname + " " + followingUser.lastname
    } now.`,
  });
};
