import {
  loginUser,
  registerUser,
  getUser,
} from "../controller/UserController.js";
import { Router } from "express";
const router = Router();

router.post("/login", loginUser);
router.post("/register", registerUser);
router.get("/user", getUser);

export default router