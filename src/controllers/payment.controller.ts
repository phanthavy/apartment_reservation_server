import prisma from "../config/prisma";
import type { Request, Response } from "express";

export const getPayments = async (req: Request, res: Response) => {
  try {
    const getPayed = await prisma.payment.findMany();

    res.status(200).json({
      message: "retrived payment successfully",
      data: getPayed,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "failed to retrieve payments" });
  }
};
