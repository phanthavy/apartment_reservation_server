import express = require("express");
const uploadRouter = express.Router();
import { getUploadSignature } from "../controllers/uploads.controller";
import { auth } from "../middlewares/auth";
import { requireRole } from "../middlewares/roles";

uploadRouter.get(
  "/uploads/signature",
  auth,
  requireRole("owner"),
  getUploadSignature,
);

export default uploadRouter;
