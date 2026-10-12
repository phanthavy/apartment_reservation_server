import type { Request, Response, NextFunction } from "express";
import type { Role } from "@prisma/client";

/**
 * Role-based access control middleware.
 * Must run AFTER `auth`, which sets `req.user` from a verified JWT.
 *
 * Usage: router.post("/", auth, requireRole("owner"), createApartment);
 */
export const requireRole = (...allowedRoles: Role[]) => {
  // Catch misconfiguration at startup: an empty list would silently block every user
  if (allowedRoles.length === 0) {
    throw new Error("requireRole() needs at least one role");
  }

  return (req: Request, res: Response, next: NextFunction) => {
    // 401: not authenticated (auth middleware missing or failed)
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // 403: authenticated, but this role is not allowed
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden: insufficient permissions" });
    }

    next();
  };
};
