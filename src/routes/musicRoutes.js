import express from "express";
const router = express.Router();
import {
  getMusic,
  getMusicById,
  deleteMusic,
  createMusic,
  updateMusic,
} from "../controllers/musicController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").get(getMusic).post(protect, admin, createMusic);
router
  .route("/:id")
  .get(getMusicById)
  .delete(protect, admin, deleteMusic)
  .put(protect, admin, updateMusic);

export default router;
