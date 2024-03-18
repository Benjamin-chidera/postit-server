import { Router } from "express";
import { auth } from "../middleware/auth.js";
import {
  createComment,
  getComment,
  deleteComment,
  editComment,
  getAComment,
} from "../controller/commentsController.js";

const router = Router();
router.post("/:blogId/comments", auth, createComment);
router.get("/:blogId/comments", auth, getComment);
router
  .route("/comments/:commentId")
  .delete(deleteComment)
  .patch(editComment)
  .get(getAComment);

export default router;
