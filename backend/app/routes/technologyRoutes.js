import express from "express";
import {
  createTechnology,
  getTechnologies,
  getTechnologyById,
  deleteTechnology,
  getTechnologyBySlug,
} from "../controllers/technologyController.js";
import { protect } from "../middleware/authmiddleware.js";

const router = express.Router();

router.post("/", protect, createTechnology);
router.get("/", protect, getTechnologies);
router.get("/slug/:slug", protect, getTechnologyBySlug);
router.get("/:id", protect, getTechnologyById);
router.delete("/:id", protect, deleteTechnology);

export default router;