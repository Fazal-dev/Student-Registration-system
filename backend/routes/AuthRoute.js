import express from "express";
import { signUpUser, loginUser } from "../controllers/AuthController.js";

const AuthRouter = express.Router();

//login route
AuthRouter.post("/login", loginUser);

// sigup route
AuthRouter.post("/signup", signUpUser);

export default AuthRouter;
