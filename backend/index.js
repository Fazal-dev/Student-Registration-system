import express from "express";
import cors from "cors";
import "dotenv/config";
import { dbConnection } from "./db/index.js";
import AuthRouter from "./routes/AuthRoute.js";
import StudentRouter from "./routes/studentRouter.js";
import path from "path";

const app = express();

app.use("/images", express.static(path.join("public")));

// middleware for parsing request body
app.use(express.json());

app.use(cors());

try {
  dbConnection();
  app.listen(process.env.PORT, (req, res) => {
    console.log(`server is running on http://localhost:${process.env.PORT}/`);
  });
} catch (error) {
  console.error("COULD NOT CONNECT TO DATABASE:", error.message);
}

app.use("/api/auth/", AuthRouter);
app.use("/api/student", StudentRouter);

app.get("/", function (req, res) {
  res.send("hello world");
});
