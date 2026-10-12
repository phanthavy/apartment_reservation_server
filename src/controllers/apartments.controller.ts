import prisma from "../config/prisma";
import type { Request, Response } from "express";

export const getApartments = async (req: Request, res: Response) => {
  try {
    const getApart = await prisma.apartment.findMany();

    res.status(200).json({
      message: "retrived Apartment successfully",
      data: getApart,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "failed to retrieve Apartments" });
  }
};
