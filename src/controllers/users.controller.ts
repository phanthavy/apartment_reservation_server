import prisma from "../config/prisma";
import type { Request, Response } from "express";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();

    res
      .status(200)
      .json({ message: "retrived users successfully", data: users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "failed to retrieve users" });
  }
};


