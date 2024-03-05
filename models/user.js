import mongoose, { Schema } from "mongoose";
import validator from "validator";
const { isEmail } = validator;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate: [isEmail, "Please enter a valid email address"],
  },
  password: {
    type: String,
    required: true,
    minlength: [7, "Password must be at least 7 characters long"],
  },

  image: {
    type: String,
    required: true,
  },
});

export const User = mongoose.model("User", userSchema);
