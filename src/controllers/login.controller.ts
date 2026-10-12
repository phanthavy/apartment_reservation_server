import { compare } from "bcrypt";
import prisma from "../config/prisma";
import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";

export const Login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const checkUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!checkUser) {
      return res.status(400).json({ message: "Invalid email or password!" });
    }

    const isMatch = await compare(password, checkUser.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password!" });
    }

    const secret = process.env.JWT_SECRET;

    if (!secret) {
      console.error("JWT_SECRET is not configured");

      return res.status(500).json({
        message: "Server configuration error",
      });
    }

    const payload = {
      id: checkUser.id,
      role: checkUser.role,
    };

    const token = jwt.sign(payload, secret, {
      expiresIn: "2h",
    });
    res.status(200).json({
      success: true,
      message: "login success",
      token,
      data: {
        id: checkUser.id,
        email: checkUser.email,
        role: checkUser.role,
        name: checkUser.name,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "failed to register" });
  }
};
