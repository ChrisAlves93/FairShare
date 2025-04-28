import { Request, Response } from "express";
import Transfer from "../models/Transfer";
import Account from "../models/Account";
import mongoose from "mongoose";
import { statusCode } from "../types/types"; // Make sure you have this or define status codes manually

export const createTransfer = async (req: Request, res: Response) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const { to, amount, expenses } = req.body;

    if (!to || !amount || !expenses) {
      await session.abortTransaction();
      return res.status(statusCode.notAccepted).json({
        message: "All fields (to, amount, expenses) are required",
      });
    }

    const numericAmount = Number(amount);

    if (isNaN(numericAmount) || numericAmount <= 0) {
      await session.abortTransaction();
      return res.status(statusCode.notAccepted).json({
        message: "Invalid amount",
      });
    }

    const senderAccount = await Account.findOne({ userId: req.userId }).session(session);
    const receiverAccount = await Account.findOne({ userId: to }).session(session);

    if (!senderAccount || !receiverAccount) {
      await session.abortTransaction();
      return res.status(statusCode.notAccepted).json({
        message: "Sender or Receiver account not found",
      });
    }

    if (senderAccount.balance < numericAmount) {
      await session.abortTransaction();
      return res.status(statusCode.notAccepted).json({
        message: "Insufficient funds",
      });
    }

    // Update balances
    senderAccount.balance -= numericAmount;
    receiverAccount.balance += numericAmount;

    await senderAccount.save({ session });
    await receiverAccount.save({ session });

    // Save transfer record (IMPORTANT!)
    const transfer = new Transfer({
      from: new mongoose.Types.ObjectId(req.userId),  // Cast `from` to ObjectId
      to: new mongoose.Types.ObjectId(to),            // Cast `to` to ObjectId
      amount: numericAmount,
      expenses: expenses.trim(),
    });
    
    console.log("Transfer object created:", transfer);
    
    await transfer.save(); // Save without session temporarily for debugging
    
    await session.commitTransaction();
    session.endSession();

    res.status(statusCode.success).json({
      message: "Transfer successful",
    });

  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error("Error during transfer:", error);
    res.status(statusCode.internalError).json({
      message: "Internal server error",
    });
  }
};

export const getRecentTransfers = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;

    const transfers = await Transfer.find({
      $or: [
        { from: userId },  // Sent
        { to: userId }     // Received
      ]
    })
      .sort({ createdAt: -1 }) // Newest first
      .limit(10);

    return res.status(200).json({
      message: "Recent transfers fetched successfully",
      data: transfers,
    });
  } catch (error) {
    console.error("Error fetching recent transfers:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


export const getExpensesSummary = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    const { startDate, endDate } = req.query;

    const matchConditions: any = {
      from: new mongoose.Types.ObjectId(userId),
    };

    if (startDate && endDate) {
      matchConditions.createdAt = {
        $gte: new Date(startDate as string),
        $lte: new Date(endDate as string),
      };
    }

    const summary = await Transfer.aggregate([
      { $match: matchConditions },
      {
        $group: {
          _id: "$expenses",
          totalAmount: { $sum: "$amount" },
        },
      },
      {
        $project: {
          _id: 0,
          expenseType: "$_id",
          totalAmount: 1,
        },
      },
    ]);

    return res.status(200).json({
      message: "Expenses summary fetched successfully",
      data: summary,
    });
  } catch (error) {
    console.error("Error fetching expenses summary:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
