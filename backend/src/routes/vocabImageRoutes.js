import express from "express";
import { getImages, fetchImage } from "../controllers/vocabImageController.js";

const router = express.Router();

router.get("/:level", getImages);
router.post("/fetch", fetchImage);

export default router;