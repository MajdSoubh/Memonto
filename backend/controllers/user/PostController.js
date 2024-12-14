import { extractFilename, removeFile } from "../../helpers/Helpers.js";
import { Post } from "../../models/Post.js";
import { User } from "../../models/User.js";
import { Types } from "mongoose";
import config from "config";

// creating a post
export const createPost = async (req, res) => {
  const data = req.body;
  data.publisher = req.user.id;

  const post = new Post(data);

  if (req?.files && req.files.length > 0) {
    req.files.forEach((file) => {
      post.images.push(file.filename);
    });
  }
  await post.save();

  res.status(200).json({
    message: "Post created successfully.",
    data: post,
  });
};

// Get a post
export const getPost = async (req, res) => {
  const postId = req.params.id;

  const post = await Post.findById(postId);

  if (!post) {
    return res.status(404).json({ message: "The request post is not found." });
  }

  res.status(200).json(post);
};

// Fetch user posts
export const fetchUserPosts = async (req, res) => {
  const userId = req.params.id;

  const posts = await Post.find({ publisher: userId });

  res.status(200).json(posts);
};

// Update post
export const updatePost = async (req, res) => {
  const postId = req.params.id;
  const post = await Post.findById(postId);
  if (!post) {
    return res
      .status(404)
      .json({ message: "The requested post is not found." });
  }
  if (!post.publisher.equals(req.user.id)) {
    return res
      .status(403)
      .json({ message: "You are not allowed to edit the post." });
  }

  await post.updateOne({ $set: req.body });

  // Delete post old images
  post?.images.forEach((img) => {
    const filename = config.get("storage.image.post") + extractFilename(img);
    removeFile(filename);
  });

  if (req?.files && req.files.length > 0) {
    req.files.forEach((file) => {
      post.images.push(file.filename);
    });
  }

  res.status(200).json({ message: "Post updated!", data: post });
};

// Delete a post
export const deletePost = async (req, res) => {
  const postId = req.params.id;
  const post = await Post.findById(postId);

  if (!post) {
    return res
      .status(404)
      .json({ message: "The requested post is not found." });
  }
  // Delete images
  post?.images.forEach((img) => {
    const filename = config.get("storage.image.post") + extractFilename(img);
    removeFile(filename);
  });
  await post.deleteOne();
  res.status(200).json({ message: "Post deleted.", data: post });
};

// React to a post
export const reactToPost = async (req, res) => {
  const postId = req.params.id;
  const post = await Post.findById(postId);

  if (!post) {
    return res
      .status(404)
      .json({ message: "The requested post is not found." });
  }

  const userId = req.user.id;

  if (post.likes.findIndex((like) => like.id === userId) > -1) {
    await post.updateOne({ $pull: { likes: userId } });
    res.status(200).json({ liked: 0, message: "Post disliked." });
  } else {
    await post.updateOne({ $push: { likes: userId } });
    res.status(200).json({ liked: 1, message: "Post liked." });
  }
};

// Get timeline posts
export const getTimelinePosts = async (req, res) => {
  const userId = req.user.id;
  const currentUserPosts = await Post.find({ publisher: userId })
    .populate("publisher", "_id email firstname lastname avatar")
    .populate("likes", "_id email firstname lastname avatar");

  const followingPosts = await User.aggregate([
    {
      $match: {
        _id: new Types.ObjectId(userId),
      },
    },
    {
      $lookup: {
        from: "posts",
        localField: "following",
        foreignField: "publisher",
        as: "followingPosts",
      },
    },
    {
      $unwind: "$followingPosts",
    },
    {
      $replaceRoot: {
        newRoot: "$followingPosts",
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "publisher",
        foreignField: "_id",
        as: "publisher",
      },
    },
    {
      $unwind: "$publisher",
    },
    {
      $lookup: {
        from: "users",
        localField: "likes",
        foreignField: "_id",
        as: "likes",
      },
    },
    {
      $project: {
        _id: 1,
        content: 1,
        "likes._id": 1,
        "likes.email": 1,
        "likes.firstname": 1,
        "likes.lastname": 1,
        "likes.avatar": 1,
        createdAt: 1,
        updatedAt: 1,
        "publisher._id": 1,
        "publisher.email": 1,
        "publisher.firstname": 1,
        "publisher.lastname": 1,
        "publisher.avatar": 1,
      },
    },
  ]);
  res.status(200).json(
    currentUserPosts.concat(followingPosts).sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    })
  );
};
