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
