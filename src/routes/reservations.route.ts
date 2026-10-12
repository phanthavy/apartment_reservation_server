import express = require("express");
const reservationRouter = express.Router();
import { getReservation } from "../controllers/reservations.controller";

reservationRouter.get("/reservations", getReservation);

export default reservationRouter;
