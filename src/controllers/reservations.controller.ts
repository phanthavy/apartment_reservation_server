import prisma from "../config/prisma";
import type { Request, Response } from "express";

export const getReservation = async (req: Request, res: Response) => {
  try {
    const getReserved = await prisma.reservation.findMany();

    res.status(200).json({
      message: "retrived reservation successfully",
      data: getReserved,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "failed to retrieve reservation" });
  }
};
