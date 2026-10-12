import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import type { Role } from "@prisma/client";

type TokenPayload = {
  id: number;
  role: Role;
};

declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload;
    }
  }
}

export const auth = (req: Request, res: Response, next: NextFunction) => {
  const header = req.headers.authorization;

  if (!header?.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "No token provided",
    });
  }

  const token = header.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "No token provided",
    });
  }

  const secret = process.env.JWT_SECRET;

  if (!secret) {
    console.error("JWT_SECRET is not configured");

    return res.status(500).json({
      message: "Server configuration error",
    });
  }

  try {
    const decoded = jwt.verify(token, secret) as unknown as TokenPayload;

    req.user = decoded;

    next();
  } catch {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};
