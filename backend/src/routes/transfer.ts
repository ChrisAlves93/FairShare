import express from "express";
import { createTransfer, getExpensesSummary, getRecentTransfers } from "../controllers/transfer";
import authMiddleware from "../middlewares/user"; // use your same authMiddleware

const transferRouter = express.Router();

transferRouter.post("/create", authMiddleware, createTransfer);  // Ensure this is /create
transferRouter.get("/summary", authMiddleware, getExpensesSummary);
transferRouter.get("/recent", authMiddleware, getRecentTransfers);

export default transferRouter;