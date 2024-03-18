import {
  getAllBlog,
  createPost,
  getAPost,
  deletePost,
  updatePost,
  getRecentPosts,
  getPostByAuthorId,
  getPostsByUser,
} from "../controller/blogController.js";
import { Router } from "express";
const router = Router();
import { auth } from "../middleware/auth.js";
import { get } from "mongoose";

router.route("/").get(getAllBlog).post(auth, createPost);
router.get("/latest", getRecentPosts);
router.route("/:blogId").get(getAPost).delete(deletePost).patch(updatePost);
router.get("/author/:authorId", getPostByAuthorId);
router.get("/author", getPostsByUser);

export default router;
