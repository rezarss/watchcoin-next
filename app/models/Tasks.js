import mongoose from "mongoose";

const subTaskSchema = new mongoose.Schema(
  {
    description: { type: String, required: true },
    action: { type: String, required: true },
    rewardCoins: { type: Number, required: true },
  },
  { _id: false },
);

const taskSchema = new mongoose.Schema(
  {
    description: { type: String, required: true },
    subTasks: [subTaskSchema],
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

export default mongoose.models.Task || mongoose.model("Task", taskSchema);
