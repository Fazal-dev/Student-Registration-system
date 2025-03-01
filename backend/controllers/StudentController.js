import mongoose from "mongoose";
import User from "../models/User.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { getUserById } from "../utility/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const uploadProfile = async (req, res) => {
  const file = req.file;

  if (!file) {
    res.status(200).json({
      status: false,
      message: "Select a picture",
    });
  }

  const { user_id } = req.body;

  const user = await User.findById(user_id);

  if (!user) {
    return res.status(404).json({ message: "User not found." });
  }

  if (user.profPic) {
    const oldImagePath = path.join("public/images", user.profPic);
    if (fs.existsSync(oldImagePath)) {
      fs.unlinkSync(oldImagePath);
    }
  }

  user.profPic = file.filename;

  await user.save();

  res.status(200).json({
    status: true,
    message: "upload profice pic successfully",
  });
};

export const getProfilePic = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(200).json({
        status: false,
        message: "User not found",
      });
    }

    if (!user.profPic) {
      return res.status(200).json({
        status: false,
        message: "No profile picture found",
        data: null,
      });
    }

    const imagePath = path.join(
      __dirname,
      "..",
      "public",
      "images",
      user.profPic
    );

    if (!fs.existsSync(imagePath)) {
      return res.status(200).json({
        status: false,
        message: "Profile picture file not found",
        data: null,
      });
    }

    return res.sendFile(imagePath);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const getStudent = async (req, res) => {
  const { id } = req.params;
  try {
    const student = await User.find({ _id: id }).select("-password");
    res.status(200).json({
      status: true,
      message: "succefull",
      data: student,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const updateStudent = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "student not found" });
  }
  try {
    const student = await getUserById(id);

    // Check if the task exists
    if (!student) {
      res.status(200).json({
        status: false,
        message: "student not found",
      });
    }

    const updateStudent = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(200).json({
      status: true,
      message: "successfully update student",
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const getAllStudents = async (req, res) => {
  try {
    const allStudents = await User.find({ role: "student" }).select(
      "-password"
    );
    res.status(200).json({
      status: true,
      message: "successfully retrive",
      data: allStudents,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const deleteStudent = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(200).json({
      status: false,
      message: "student not found",
    });
  }
  try {
    const student = await getUserById(id);

    if (!student) {
      return res.status(200).json({
        status: false,
        message: "student not found",
      });
    }

    const deleteStudent = await User.findByIdAndDelete(id);

    res.status(200).json({
      status: true,
      message: "succesfully Delete student",
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
