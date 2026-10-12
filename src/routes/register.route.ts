import express = require("express");
const registerRouter = express.Router();
import { Register } from "../controllers/register.controller";

registerRouter.post("/register", Register);

export default registerRouter;
