import mongoose from "mongoose";

const TransferSchema = new mongoose.Schema(
  {
    from: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    to: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true },
    expenses: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Transfer", TransferSchema);