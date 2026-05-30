// forgotPasswordRoutes.js
// backend/src/routes/forgotPasswordRoutes.js
// Add to index.js: import forgotPasswordRoutes from "./routes/forgotPasswordRoutes.js";
//                  app.use("/api/auth", forgotPasswordRoutes);

import express from "express";
import {
  forgotPassword,
  verifyOtp,
  resetPassword,
} from "../controllers/forgotPasswordController.js";

const router = express.Router();

router.post("/forgot-password", forgotPassword);  // POST /api/auth/forgot-password
router.post("/verify-otp",      verifyOtp);       // POST /api/auth/verify-otp
router.post("/reset-password",  resetPassword);   // POST /api/auth/reset-password

export default router;