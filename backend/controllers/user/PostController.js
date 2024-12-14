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
