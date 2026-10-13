import crypto from "crypto";
import type { Request, Response } from "express";

const UPLOAD_FOLDER = "apartments";

export const getUploadSignature = (req: Request, res: Response) => {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    console.error("Cloudinary environment variables are not configured");
    return res.status(500).json({ message: "Image upload is not configured" });
  }

  const timestamp = Math.round(Date.now() / 1000);

  // Cloudinary signs the upload params sorted alphabetically, followed by the API secret
  const signature = crypto
    .createHash("sha1")
    .update(`folder=${UPLOAD_FOLDER}&timestamp=${timestamp}${apiSecret}`)
    .digest("hex");

  res.status(200).json({
    cloudName,
    apiKey,
    timestamp,
    signature,
    folder: UPLOAD_FOLDER,
  });
};
