import express = require("express");
const apartmentRouter = express.Router();
import { getApartments } from "../controllers/apartments.controller";

apartmentRouter.get("/apartments", getApartments);

export default apartmentRouter;
