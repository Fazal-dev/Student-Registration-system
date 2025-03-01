import mongoose from "mongoose";
const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    email: {
      type: String,
      required: true,
      unique: true,
    },
    age: String,
    password: String,
    role: {
      type: String,
      enum: ["student", "teacher"],
      default: "student",
    },
    subjects: [
      {
        subjectName: { type: String, required: true },
        mark: {
          type: Number,
          min: 0,
          max: 100,
          required: true,
        },
      },
    ],
    profPic: String,
  },
  {
    timestamps: true,
  }
);

userSchema.set("toJSON", {
  getters: true,
});

const User = model("User", userSchema);

export default User;
