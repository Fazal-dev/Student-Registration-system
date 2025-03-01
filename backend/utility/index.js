import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

export const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

export const hashPassword = async (password) => {
  return bcrypt.hash(password, bcrypt.genSalt(10));
};

export const getUser = async (email) => {
  return User.findOne({ email });
};

export const getUserById = async (id) => {
  return User.findById(id);
};

export const isUserAuthenticated = async (email, password) => {
  const user = await getUser(email);
  return bcrypt.compare(password, user.password);
};
