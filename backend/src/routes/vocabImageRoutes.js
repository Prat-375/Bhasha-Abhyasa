import express from "express";
import { getImages, fetchImage } from "../controllers/vocabImageController.js";

const router = express.Router();

router.post("/fetch", fetchImage);
router.get("/:level", getImages);

export default router;