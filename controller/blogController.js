import { Blog } from "../models/blog.js";
import { tryCatch } from "../utils/tryCatch.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

export const getAllBlog = tryCatch(async (req, res) => {
  const blog = await Blog.find().sort("-createdAt");

  res.status(200).json({ msg: "success", NumOfPosts: blog.length, blog });
});

export const getRecentPosts = tryCatch(async (req, res) => {
  const recent = await Blog.find().sort("-createdAt").limit(3);

  res.status(200).json({ msg: " successful", recent });
});

export const createPost = tryCatch(async (req, res) => {
  const { title, tags, description, author, blogStatus } = req.body;

  const { userId } = req.user;

  req.user.author = userId;

  const imageResult = await cloudinary.uploader.upload(
    req.files.image.tempFilePath,
    {
      use_filenames: true,
      folder: "Postit",
    }
  );

  fs.unlinkSync(req.files.image.tempFilePath);

  const post = await Blog.create({
    title,
    tags,
    description,
    author: userId,
    image: imageResult.secure_url,
    blogStatus,
  });

  res.status(201).json({ msg: "success", post });
});

export const getAPost = tryCatch(async (req, res) => {
  const { blogId } = req.params;
  const post = await Blog.findById({ _id: blogId });

  if (!post) {
    throw new Error(`Could not find post ${blogId}`);
  }

  res.status(200).json({ msg: "success", post });
});

export const getPostByAuthorId = tryCatch(async (req, res) => {
  const { authorId } = req.params;

  const authors = await Blog.find({ author: authorId }).sort("-createdAt");

  if (!authors) {
    throw new Error(`Could not find post ${authorId}`);
  }

  res
    .status(200)
    .json({ msg: "Author posts", NumOfPosts: authors.length, authors });
});

export const deletePost = tryCatch(async (req, res) => {
  const { blogId } = req.params;

  const post = await Blog.findById({ _id: blogId });

  if (!post) {
    throw new Error(`Could not find post ${blogId}`);
  }

  console.log(post.image.public_id);

  //  deleting img from cloudinary
  if (post.image && post.image.public_id) {
    const publicId = post.image.public_id;
    await cloudinary.uploader.destroyImage(publicId);
  }

  await Blog.findByIdAndDelete({ _id: blogId });

  res.status(200).json({ msg: "Author posts deleted successfully" });
});

export const updatePost = tryCatch(async (req, res) => {
  const { blogId } = req.params;
  const { title, tags, description } = req.body;

  const image = req.files.image ? req.files.image.tempFilePath : null;

  let updatedPost = {};

  if (title) updatedPost.title = title;
  if (description) updatedPost.description = description;
  if (tags) updatedPost.tags = tags;

  if (req.files && req.files.image) {
    const imageResult = await cloudinary.uploader.upload(image, {
      use_filename: true,
      folder: "Postit",
    });
    fs.unlinkSync(req.files.image.tempFilePath);
    updatedPost.image = imageResult.secure_url;
  }

  const post = await Blog.findByIdAndUpdate({ _id: blogId }, updatedPost, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ msg: "Post updated successfully", post });
});
