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

// Unfollow a User
export const unfollowUser = async (req, res) => {
  const currentUserId = req.user.id;
  const followingUserId = req.params.id;

  const currentUser = await User.findById(currentUserId).withoutPopulation();
  const followingUser = await User.findById(
    followingUserId
  ).withoutPopulation();

  if (!currentUser.following.includes(followingUserId)) {
    return res.status(400).json({
      message: `You are already not following ${
        followingUser.firstname + " " + followingUser.lastname
      }`,
    });
  }
  await currentUser.updateOne({ $pull: { following: followingUserId } });
  await followingUser.updateOne({ $pull: { followers: currentUserId } });

  res.status(200).json({
    message: `You have successfully unfollowed ${
      followingUser.firstname + " " + followingUser.lastname
    }.`,
  });
};
// Following Suggestion
export const getFollowingSuggestion = async (req, res) => {
  let result = await User.aggregate([
    { $match: { _id: new Types.ObjectId(req.user.id) } },
    {
      $project: {
        _id: 0,
        suggestions: {
          $filter: {
            input: "$followers",
            as: "follower",
            cond: { $not: { $in: ["$$follower", "$following"] } },
          },
        },
      },
    },

    {
      $lookup: {
        from: "users", // Collection name for User model
        localField: "suggestions",
        foreignField: "_id",
        as: "suggestions",
      },
    },
    {
      $unwind: "$suggestions",
    },
    {
      $replaceRoot: {
        newRoot: "$suggestions",
      },
    },
    {
      $unionWith: {
        coll: "users",
        pipeline: [{ $sample: { size: 3 } }],
      },
    },
    {
      $project: {
        password: 0,
      },
    },
    { $limit: 3 },
  ]);
  result = result.map((doc) => new User(doc).toObject());
  res.status(200).json(result);
};

export const searchForUser = async (req, res) => {
  const query = req.body.query.toLowerCase();
  const matchedUsers = await User.aggregate([
    {
      $addFields: {
        fullName: { $concat: ["$firstname", " ", "$lastname"] }, // Merge fields
      },
    },
    {
      $match: {
        $or: [
          { fullName: { $regex: `^${query}`, $options: "i" } }, // Match fullName
          { email: { $regex: `^${query}`, $options: "i" } }, // Match email
        ],
      },
    },
    {
      $limit: 5, // Limit to 5 results
    },
  ]);

  res.status(200).json(matchedUsers);
};
