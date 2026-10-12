import express = require("express");
const loginRouter = express.Router();
import { Login } from "../controllers/login.controller";

loginRouter.post("/login", Login);

export default loginRouter;
