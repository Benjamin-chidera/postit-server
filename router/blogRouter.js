import {
  getAllBlog,
  createPost,
  getAPost,
  deletePost,
  updatePost,
  getRecentPosts,
  //   getPostByAuthorId
} from "../controller/blogController.js";
import { Router } from "express";
const router = Router();
import { auth } from "../middleware/auth.js";

router.route("/").get(getAllBlog).post(auth, createPost);
router.route("/:blogId").get(getAPost).delete(deletePost).patch(updatePost)
// router.get("/:authorId", getPostByAuthorId);
router.get("/recent", getRecentPosts);

export default router;
