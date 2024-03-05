import mongoose, { Schema, Types } from "mongoose";

const blogSchema = new Schema(
  {
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
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Blog = mongoose.model("Blog", blogSchema);
