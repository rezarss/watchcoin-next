import mongoose from "mongoose";

const userSubTaskSchema = new mongoose.Schema(
  {
    subTaskId: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
  },
  { _id: false },
);

const userSchema = new mongoose.Schema(
  {
    telegramId: { type: String, required: true, unique: true },
    coins: { type: Number, default: 0 },
    clickPower: {
      type: Number,
      default: process.env.NEXT_PUBLIC_CLICKPOWER_DEFAULT,
    },
    energy: { type: Number, default: process.env.NEXT_PUBLIC_ENERGY },
    maxEnergy: { type: Number, default: process.env.NEXT_PUBLIC_MAXENERGY },
    boosters: {
      multitap: {
        level: {
          type: Number,
          default: process.env.NEXT_PUBLIC_MULTITAP_DEFAULT_LEVEL,
        },
        cost: {
          type: Number,
          default: process.env.NEXT_PUBLIC_MULTITAP_DEFAULT_COST,
        },
      },
      energyLimit: {
        level: {
          type: Number,
          default: process.env.NEXT_PUBLIC_ENERGYLIMIT_DEFAULT_LEVEL,
        },
        cost: {
          type: Number,
          default: process.env.NEXT_PUBLIC_ENERGYLIMIT_DEFAULT_COST,
        },
      },
      rechargingSpeed: {
        level: {
          type: Number,
          default: process.env.NEXT_PUBLIC_RECHARGINGSPEED_DEFAULT_LEVEL,
        },
        cost: {
          type: Number,
          default: process.env.NEXT_PUBLIC_RECHARGINGSPEED_DEFAULT_COST,
        },
      },
    },
    subTasks: [userSubTaskSchema],
  },
  { timestamps: true },
);

export default mongoose.models.User || mongoose.model("User", userSchema);
