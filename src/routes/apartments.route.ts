import express = require("express");
const apartmentRouter = express.Router();
import {
  createApartment,
  getApartments,
  getMyApartments,
  updateApartmentStatus,
} from "../controllers/apartments.controller";
import { auth } from "../middlewares/auth";
import { requireRole } from "../middlewares/roles";

apartmentRouter.get("/apartments", getApartments);
apartmentRouter.get(
  "/apartments/mine",
  auth,
  requireRole("owner"),
  getMyApartments,
);
apartmentRouter.post(
  "/apartments",
  auth,
  requireRole("owner"),
  createApartment,
);
apartmentRouter.patch(
  "/apartments/:id/status",
  auth,
  requireRole("owner"),
  updateApartmentStatus,
);

export default apartmentRouter;
