import { hash } from "bcrypt";
import prisma from "../config/prisma";
import type { Request, Response } from "express";

export const Register = async (req: Request, res: Response) => {
  try {
    const { name, phone, email, password, role } = req.body;

    const allowedRoles = ["renter", "owner"] as const;
    const userRole = allowedRoles.includes(role) ? role : "renter";

    const checkUser = await prisma.user.findUnique({
      where: {
        email: req.body.email,
      },
    });

    if (checkUser) {
      return res.status(400).json({ message: "This user already exists" });
    }

    const hashedPssword = await hash(password, 10);

    const getNewUser = await prisma.user.create({
      data: {
        name,
        phone,
        email: email,
        password: hashedPssword,
        role: userRole,
      },
    });

    res.status(201).json({
      success: true,
      message: "Registered successfully",
      data: getNewUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "failed to register" });
  }
};
