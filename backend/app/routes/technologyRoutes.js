import express from "express";

import {
  createTechnology,
  getTechnologies,
  getTechnologyById,
  deleteTechnology,
} from "../controllers/technologyController.js";
const router = express.Router();

router.post("/", createTechnology);
router.get("/", getTechnologies);
router.get("/:id", getTechnologyById);
router.delete("/:id", deleteTechnology);
export default router;