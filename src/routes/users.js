require("dotenv").config();

const { User } = require("../models/models");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const express = require("express");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

const registerUser = async (req, res) => {
  const { email, password, username } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({ email, password, username });

    res.status(201).json({
      id: user._id,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const authUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user.id,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const resetToken = generateToken(user._id);

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: user.email,
      subject: "Password Reset",
      text: `You requested for a password reset. Please use the following token to reset your password: ${resetToken}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Email sent" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUsers = async (req, res) => {
  const { id } = req.params;

  try {
    if (id) {
      const user = await User.findById(id);

      return user
        ? res.status(200).json(user)
        : res.status(404).send("User not found");
    } else {
      const users = await User.find();
      res.status(200).json(users);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error getting users");
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).send("User not found");
    }

    res.status(200).json({
      message: "User deleted succesfully",
      user: deletedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting user");
  }
};

router.post("/users/register", registerUser);
router.post("/users/login", authUser);
router.post("/users/forgot-password", protect, forgotPassword);
router.get("/users/:id?", protect, getUsers);
router.delete("/users/:id?", protect, deleteUser);

module.exports = router;
