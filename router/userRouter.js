import {
  loginUser,
  registerUser,
  getUser,
  getAUser,
} from "../controller/UserController.js";
import { Router } from "express";
const router = Router();

router.post("/login", loginUser);
router.post("/register", registerUser);
router.get("/user", getUser);
router.get("/user/:userId", getAUser);

export default router;
