import express = require("express");
const userRouter = express.Router();
import { getUsers } from "../controllers/users.controller";

userRouter.get("/users", getUsers);

export default userRouter;
