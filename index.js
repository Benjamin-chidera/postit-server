import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import fileupload from "express-fileupload";
import mongoose from "mongoose";
import { errorHandler } from "./middleware/errorHandler.js";
import { tryCatch } from "./utils/tryCatch.js";
import UserRouter from "./router/userRouter.js";
import BlogRouter from "./router/blogRouter.js";
import { v2 as cloudinary } from "cloudinary";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

app.use(errorHandler);
app.use(fileupload({ useTempFiles: true }));
app.use(express.json());
app.use(cors());

app.use("/api/v1/user", UserRouter);
app.use("/api/v1/posts", BlogRouter);

app.get("/", (req, res) => {
  res.json("home page");
});


const server = tryCatch(async (req, res) => {
  await mongoose.connect(process.env.MONGO, { dbName: "POSTIT-SERVER" });
  app.listen(PORT, () => {
    console.log(" listening on port " + PORT);
  });
});

server();
