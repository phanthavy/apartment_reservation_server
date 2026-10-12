import express = require("express");
import cors = require("cors");
import "dotenv/config";
import userRouter from "./routes/users.route";
import apartmentRouter from "./routes/apartments.route";
import paymentRouter from "./routes/payment.route";
import reservationRouter from "./routes/reservations.route";
import registerRouter from "./routes/register.route";
import loginRouter from "./routes/login.route";

const app = express();
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGIN?.split(","),
  }),
);
app.use(express.json());

app.use("/api", userRouter);
app.use("/api", apartmentRouter);
app.use("/api", paymentRouter);
app.use("/api", reservationRouter);
app.use("/api", registerRouter);
app.use("/api", loginRouter);

const PORT = process.env.PORT;
app.listen(PORT, () =>
  console.log("server is runing on http://localhost:" + PORT),
);
