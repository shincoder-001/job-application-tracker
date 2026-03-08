import "dotenv/config";
import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";

const app = express();

/* CORS CONFIGURATION */
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://job-application-tracker-phi-three.vercel.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  })
);

app.use(express.json());

/* ROUTES */
app.use("/auth", authRoutes);
app.use("/api", userRoutes);

/* HEALTH CHECK */
app.get("/", (req, res) => {
  res.send("Job Application Tracker API is running 🚀");
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});