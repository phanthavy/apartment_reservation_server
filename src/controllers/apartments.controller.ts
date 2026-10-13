import prisma from "../config/prisma";
import type { Request, Response } from "express";
import type { ApartmentType } from "@prisma/client";

const APARTMENT_TYPES: ApartmentType[] = ["studio", "one_bed", "two_bed"];

const typeFromBeds = (beds: number): ApartmentType =>
  beds <= 0 ? "studio" : beds === 1 ? "one_bed" : "two_bed";

const toStringArray = (value: unknown): string[] =>
  Array.isArray(value) ? value.filter((v) => typeof v === "string") : [];

const toCloudinaryUrls = (value: unknown): string[] =>
  toStringArray(value)
    .filter((url) => url.startsWith("https://res.cloudinary.com/"))
    .slice(0, 10);

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

export const getMyApartments = async (req: Request, res: Response) => {
  try {
    const apartments = await prisma.apartment.findMany({
      where: { ownerId: req.user!.id },
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json({ success: true, data: apartments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "failed to retrieve your apartments" });
  }
};

export const updateApartmentStatus = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { isOpen } = req.body;

    if (!Number.isInteger(id) || typeof isOpen !== "boolean") {
      return res.status(400).json({ message: "isOpen must be true or false" });
    }

    const apartment = await prisma.apartment.findUnique({ where: { id } });

    if (!apartment || apartment.ownerId !== req.user!.id) {
      return res.status(404).json({ message: "Apartment not found" });
    }

    const updated = await prisma.apartment.update({
      where: { id },
      data: { isOpen },
    });

    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "failed to update apartment" });
  }
};

export const createApartment = async (req: Request, res: Response) => {
  try {
    const {
      title,
      area,
      type,
      beds,
      baths,
      sizeM2,
      rentMonth,
      deposit,
      amenities,
      photos,
      included,
      availableFrom,
      minStayMonths,
      petsAllowed,
      smokingAllowed,
    } = req.body;

    const rent = Number(rentMonth);
    const bedCount = Number(beds) || 0;

    if (!title?.trim() || !area?.trim() || !(rent > 0)) {
      return res
        .status(400)
        .json({ message: "Title, area and monthly rent are required" });
    }

    const availableDate = availableFrom ? new Date(availableFrom) : null;
    if (availableDate && Number.isNaN(availableDate.getTime())) {
      return res.status(400).json({ message: "Invalid available from date" });
    }

    const apartment = await prisma.apartment.create({
      data: {
        ownerId: req.user!.id,
        title: title.trim(),
        area: area.trim(),
        type: APARTMENT_TYPES.includes(type) ? type : typeFromBeds(bedCount),
        beds: bedCount,
        baths: Number(baths) || 1,
        sizeM2: Number(sizeM2) || 0,
        rentMonth: rent,
        deposit: Number(deposit) || 0,
        amenities: toStringArray(amenities),
        photos: toCloudinaryUrls(photos),
        included: toStringArray(included),
        availableFrom: availableDate,
        minStayMonths: Number(minStayMonths) || 1,
        petsAllowed: Boolean(petsAllowed),
        smokingAllowed: Boolean(smokingAllowed),
      },
    });

    res.status(201).json({ success: true, data: apartment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "failed to create apartment" });
  }
};
