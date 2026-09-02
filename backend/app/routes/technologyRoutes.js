import express from "express";

import {
  createTechnology,
  getTechnologies,
  getTechnologyById,
  deleteTechnology,
  getTechnologyBySlug,
} from "../controllers/technologyController.js";

const router = express.Router();

router.post("/", createTechnology);

router.get("/", getTechnologies);

router.get(
  "/slug/:slug",
  getTechnologyBySlug
);

router.get(
  "/:id",
  getTechnologyById
);

router.delete(
  "/:id",
  deleteTechnology
);

export default router;