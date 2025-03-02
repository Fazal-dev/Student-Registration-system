import User from "../models/User.js";
import { sendEmail } from "../mail/mail.js";
import {
  generateToken,
  getUser,
  hashPassword,
  isUserAuthenticated,
} from "../utility/index.js";

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await getUser(email);

  const userExist = await isUserAuthenticated(email, password);

  if (userExist) {
    res.json({
      status: true,
      message: "succefully login",
      role: user.role,
      _id: user.id,
      token: generateToken(user._id),
    });
  } else {
    res.status(200).json({
      status: false,
      message:
        "Invalid email or password. Please check your credentials and try again.",
    });
  }
};

export const signUpUser = async (req, res) => {
  const { email, password, firstName, lastName, age, role, confirmPassword } =
    req.body;

  try {
    const existingUser = await getUser(email);

    if (existingUser) {
      return res.status(200).json({
        status: false,
        message: "Email already exists. Please choose a different email .",
      });
    }

    const hashedPassword = await hashPassword(password);

    const user = await User.create({
      firstName,
      lastName,
      age,
      role,
      email,
      password: hashedPassword,
    });

    if (role == "student") {
      const name = `${firstName} ${lastName}`;
      await sendEmail(email, name);
    }

    res.status(201).json({
      status: true,
      message: "succefully Register",
      _id: user.id,
      email: user.email,
    });
  } catch (error) {
    res.status(201).json({
      status: false,
      message: "Internal server error",
    });
  }
};
