import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import env from "../src/utils/validateEnv"; // Your environment file
import rootRouter from "../src/routes";      // Your routes

const app = express();

// 🚨 Correct CORS Setup
app.use(cors({
  origin: env.FRONTEND_URL, // Must exactly match your frontend URL
  credentials: true         // MUST be true to allow cookies/authorization headers
}));

// 🛠 Other Middlewares
app.use(express.json());
app.use(cookieParser());

// 📋 Routes
app.use("/api/v1", rootRouter);

// 📋 Test route
app.get("/", (req: Request, res: Response) => {
  res.send("Jai Shri Ram ji"); // Keeping your greeting 😄
});

// 🚀 Server listen
app.listen(env.PORT, () => {
  console.log(`✅ Server running at port: ${env.PORT}`);
});
