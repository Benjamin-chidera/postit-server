import { User } from "../models/user.js";
import { tryCatch } from "../utils/tryCatch.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

export const registerUser = tryCatch(async (req, res) => {
  const { name, password, email } = req.body;

  if (!name || !password || !email) {
    throw new Error("Please fill all required fields");
  }

  const userRegistered = await User.findOne({ email });

  if (userRegistered) {
    throw new Error("Email already in use");
  }

  const salt = await bcrypt.genSalt();
  const hased = await bcrypt.hash(password, salt);

  const imageResult = await cloudinary.uploader.upload(
    req.files.image.tempFilePath,
    {
      use_filename: true,
      folder: "user-image",
    }
  );
  fs.unlinkSync(req.files.image.tempFilePath);

  const user = await User.create({
    email,
    name,
    password: hased,
    image: imageResult.secure_url,
  });

  res.status(201).json({
    msg: "successfully registered",
    user: {
      name: user.name,
      email: user.email,
      image: user.image,
    },
  });
});

export const loginUser = tryCatch(async (req, res) => {
  const { password, email } = req.body;

  if (!password || !email) {
    throw new Error("Please fill all required fields");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const checkPassword = await bcrypt.compare(password, user.password);

  if (!checkPassword) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign(
    { userId: user._id, name: user.name, image: user.image },
    process.env.TOKEN,
    {
      expiresIn: "2d",
    }
  );

  res.status(200).json({
    msg: "success",
    user: {
      userId: user.id,
      name: user.name,
      email: user.email,
      userImage: user.image,
      token,
    },
  });
});

export const getUser = tryCatch(async (req, res) => {
  const user = await User.find();

  res.status(200).json({ msg: "User found", user });
});
