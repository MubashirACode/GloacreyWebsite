import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"]
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, "Password is required"]
    },
    cartItems: {
      type: Object,
      default: {}
    }
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
    minimize: false // Prevents Mongoose from removing empty objects
  }
);

// Prevents model overwrite issues in development
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
