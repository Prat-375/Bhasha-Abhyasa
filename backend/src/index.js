import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import levelRoutes from "./routes/levelRoutes.js";
import themeRoutes from "./routes/themeRoutes.js";
import practiceQuestionRoutes from "./routes/practiceQuestionRoutes.js";
import progressRoutes from "./routes/progressRoutes.js";
import authRoutes from "./routes/authRoutes.js";


dotenv.config();

const app = express();

const allowedOrigins = [
  process.env.CLIENT_URL,
  process.env.PRODUCTION_CLIENT_URL,
  process.env.DOCKER_CLIENT_URL,
].filter(Boolean);

connectDB();

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Bhasha Abhyasa API is running" });
});

app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/levels", levelRoutes);
app.use("/api/themes", themeRoutes);
app.use("/api/practice-questions", practiceQuestionRoutes);
app.use("/api/progress", progressRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`[INFO] Server running on port ${PORT}`);
});