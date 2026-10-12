import express = require("express");
const paymentRouter = express.Router();
import { getPayments } from "../controllers/payment.controller";

paymentRouter.get("/payments", getPayments);

export default paymentRouter;
