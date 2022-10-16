import express from "express";
const router = express.Router();
import {
  authUser,
  getAllLike,
  addLike,
  addDislike,
  getAllDislike,
} from "../controllers/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.post("/login", authUser);

router.get("/like", protect, getAllLike).post("/like/:id", protect, addLike);

router
  .get("/dislike", protect, getAllDislike)
  .post("/dislike/:id", protect, addDislike);

export default router;
