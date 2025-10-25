import User from "../Model/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async function (req, res) {
  try {
    await User.create({
      ...req.body,
      password: await bcrypt.hash(req.body.password, 10),
    });
    res.status(201).json({ ok: true, message: "Succesfully registered" });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        ok: false,
        message: "User already exists",
      });
    }

    if (error.name === "ValidationError") {
      return res.status(400).json({
        ok: false,
        message: "Validation error",
      });
    }

    res.status(500).json({ ok: false, message: "Internal server error" });
  }
};

export const login = async function (req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(401)
        .json({ ok: false, message: "Email or password incorrect" });
    }

    if (!(await bcrypt.compare(req.body.password, user.password))) {
      return res
        .status(401)
        .json({ ok: false, message: "Email or password incorrect" });
    }

    req.session.token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        username: user.username,
      },
      process.env.JWT_SECRET,
      { expiresIn: 3600 }
    );

    res.status(200).json({ ok: true, message: "Succesfully logged in" });
  } catch (error) {
    res.status(500).json({ ok: false, message: "Internal server error" });
  }
};

export const logout = function (req, res) {
  try {
    req.session.destroy();
    res.status(200).json({ ok: true, message: "Succesfully logged out" });
  } catch (error) {
    res.status(500).json({ ok: false, message: "Internal server error" });
  }
};
