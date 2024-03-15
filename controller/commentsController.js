import { Blog } from "../models/blog.js";
import Comment from "../models/comment.js";
import { tryCatch } from "../utils/tryCatch.js";

export const createComment = tryCatch(async (req, res) => {
  const { blogId } = req.params;
  const { comments, author } = req.body;
  const { userId } = req.user;

  console.log(blogId, comments, author);

  req.body.author = userId;

  try {
    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({ error: "Blog post not found" });
    }

    const comment = new Comment({
      comments,
      author: userId,
      blog: blogId,
    });

    await comment.save();

    blog.comments.push(comment);
    await blog.save();

    res.status(201).json({ message: "Comment created successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to save comment" });
  }
});

export const getComment = tryCatch(async (req, res) => {
  const { blogId } = req.params;

  const blog = await Blog.findById(blogId).populate("comments");

  if (!blog) {
    return res.status(404).json({ error: "Blog post not found" });
  }

  res.status(200).json({ msg: "Blog post found", blog: blog.comments });
});

export const deleteComment = tryCatch(async (req, res) => {
  const { commentId } = req.params;

  const comment = await Comment.findById(commentId);

  if (!comment) {
    return res.status(404).json({ error: "Blog post not found" });
  }

  const blog = await Blog.findById(comment.blog);

  if (!blog) {
    return res.status(404).json({ error: "Blog post not found" });
  }

  blog.comments.pull(commentId);
  await blog.save();

  await Comment.findByIdAndDelete(commentId);

  res.status(200).json({ message: "Comment deleted successfully" });
});

export const editComment = tryCatch(async (req, res) => {
  const { commentId } = req.params;

  const comment = await Comment.findByIdAndUpdate(commentId, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ message: "Comment updated successfully", comment });
});

export const getAComment = tryCatch(async (req, res) => {
  const { commentId } = req.params;

  const comment = await Comment.findById(commentId);

  res.status(200).json({ message: "Comment Found successfully", comment });
});
