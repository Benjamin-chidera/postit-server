import mongoose, { Schema, Types } from "mongoose";

const blogSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    tags: {
      type: String,
      required: true,

      enum: [
        "technology",
        "nature",
        "lifestyle",
        "sports",
        "education",
        "politics",
      ],
    },

    blogStatus: {
      type: String,
      required: true,
      enum: ["published", "draft"],
      default: "published",
    },

    image: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    author: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },

    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  { timestamps: true }
);

export const Blog = mongoose.model("Blog", blogSchema);
