import mongoose, { Schema, Types } from "mongoose";

const commentSchema = new Schema(
  {
    comments: {
      type: String,
      required: true,
       unique: true,
    },

    blog: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
       unique: true,
    },

    author: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;