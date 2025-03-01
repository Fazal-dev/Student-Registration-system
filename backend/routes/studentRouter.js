import express from "express";
import {
  deleteStudent,
  getAllStudents,
  getProfilePic,
  getStudent,
  updateStudent,
  uploadProfile,
} from "../controllers/StudentController.js";

import multer from "multer";

const storage = multer.diskStorage({
  destination: "public/images/",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

const StudentRouter = express.Router();

// get all students
StudentRouter.get("/", getAllStudents);

// delete
StudentRouter.delete("/:id", deleteStudent);

// update
StudentRouter.patch("/:id", updateStudent);

// get student detail
StudentRouter.get("/:id", getStudent);

StudentRouter.post("/profile", upload.single("file"), uploadProfile);

StudentRouter.post("/:id/profile", getProfilePic);

export default StudentRouter;
