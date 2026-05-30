// forgotPasswordController.js
// backend/src/controllers/forgotPasswordController.js

import crypto from "crypto";
import nodemailer from "nodemailer";
import User from "../models/User.js";

// In-memory OTP store: { email: { code, expiresAt } }
// For production use Redis or store in DB
const otpStore = new Map();

// ── Email transporter — created at request time so env vars are loaded ──
const getTransporter = () => nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ── POST /api/auth/forgot-password ────────────────────────────
// Sends a 6-digit OTP to the registered email
export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email is required" });

  try {
    const user = await User.findOne({ email: email.toLowerCase() });
    // Always respond success — don't reveal if email exists
    if (!user) {
      return res.json({ message: "If this email is registered, a code has been sent." });
    }

    // Generate 6-digit code
    const code = crypto.randomInt(100000, 999999).toString();
    const expiresAt = Date.now() + 15 * 60 * 1000; // 15 minutes

    otpStore.set(email.toLowerCase(), { code, expiresAt });

    // Send email
    await getTransporter().sendMail({
      from: `"Bhasha Abhyāsa" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your password reset code",
      html: `
        <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:2rem;background:#0c0f1e;color:#f0eeff;border-radius:12px;">
          <h2 style="margin-bottom:0.5rem;">🔐 Password Reset</h2>
          <p style="color:#c8c4e0;">You requested a password reset for your Bhasha Abhyāsa account.</p>
          <div style="margin:2rem 0;text-align:center;">
            <div style="display:inline-block;background:#1a1a2e;border:2px solid #9d72ff;border-radius:12px;padding:1.5rem 2.5rem;">
              <p style="margin:0;font-size:0.85rem;color:#8880a8;letter-spacing:0.1em;text-transform:uppercase;">Your code</p>
              <p style="margin:0.5rem 0 0;font-size:2.5rem;font-weight:900;letter-spacing:0.25em;color:#9d72ff;">${code}</p>
            </div>
          </div>
          <p style="color:#8880a8;font-size:0.85rem;">This code expires in <strong>15 minutes</strong>. If you did not request this, ignore this email.</p>
        </div>
      `,
    });

    res.json({ message: "If this email is registered, a code has been sent." });
  } catch (err) {
    console.error("forgotPassword error:", err);
    res.status(500).json({ message: "Failed to send email" });
  }
};

// ── POST /api/auth/verify-otp ─────────────────────────────────
// Verifies the 6-digit code
export const verifyOtp = async (req, res) => {
  const { email, code } = req.body;
  if (!email || !code) return res.status(400).json({ message: "Email and code required" });

  const entry = otpStore.get(email.toLowerCase());
  if (!entry) return res.status(400).json({ message: "No code found. Please request a new one." });
  if (Date.now() > entry.expiresAt) {
    otpStore.delete(email.toLowerCase());
    return res.status(400).json({ message: "Code has expired. Please request a new one." });
  }
  if (entry.code !== code.trim()) {
    return res.status(400).json({ message: "Invalid code. Please try again." });
  }

  // Code is valid — mark as verified (replace code with a reset token)
  const resetToken = crypto.randomBytes(32).toString("hex");
  otpStore.set(email.toLowerCase(), { resetToken, expiresAt: Date.now() + 10 * 60 * 1000 });

  res.json({ message: "Code verified", resetToken });
};

// ── POST /api/auth/reset-password ─────────────────────────────
// Resets the password using the reset token
export const resetPassword = async (req, res) => {
  const { email, resetToken, password } = req.body;
  if (!email || !resetToken || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: "Password must be at least 6 characters" });
  }

  const entry = otpStore.get(email.toLowerCase());
  if (!entry || entry.resetToken !== resetToken || Date.now() > entry.expiresAt) {
    return res.status(400).json({ message: "Session expired. Please start again." });
  }

  try {
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Hash password manually with bcrypt then update directly
    // (bypasses any pre-save hook issues)
    const bcrypt = await import("bcryptjs");
    const salt   = await bcrypt.default.genSalt(10);
    const hashed = await bcrypt.default.hash(password, salt);

    await User.findOneAndUpdate(
      { email: email.toLowerCase() },
      { $set: { password: hashed } }
    );

    otpStore.delete(email.toLowerCase());

    // Send confirmation email
    await getTransporter().sendMail({
      from: `"Bhasha Abhyāsa" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your password has been changed",
      html: `
        <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:2rem;background:#0c0f1e;color:#f0eeff;border-radius:12px;">
          <h2>✅ Password Changed</h2>
          <p style="color:#c8c4e0;">Your Bhasha Abhyāsa password was successfully changed.</p>
          <p style="color:#c8c4e0;">If you did not make this change, please contact support immediately.</p>
          <p style="color:#8880a8;font-size:0.85rem;margin-top:2rem;">— The Bhasha Abhyāsa Team</p>
        </div>
      `,
    });

    res.json({ message: "Password reset successfully" });
  } catch (err) {
    console.error("resetPassword error:", err);
    res.status(500).json({ message: "Failed to reset password" });
  }
};