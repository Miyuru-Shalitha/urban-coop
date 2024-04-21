import "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import connect from "../config/db.config";
import logger from "../middlewares/logger.middleware";
import employeeRoute from "../routes/employee.route";
import authRoute from "../routes/auth.route";
import employeeAuthRoute from "../routes/employeeAuth.route";
import roleRoute from "../routes/role.route";
import bookingRoute from "../routes/booking.route";

import eventRoute from "../routes/Event.route";
import regroute from "../routes/eventRegister.route";

import supplierRoute from "../routes/supplier.route";


const app = express();
const port = process.env.PORT!;
app.use(express.static('uploads'));
// Middlewares
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(logger);

connect();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// Routes
app.use("/api/auth", authRoute);
app.use("/api/employee-auth", employeeAuthRoute);
app.use("/api/employees", employeeRoute);
app.use("/api/roles", roleRoute);

app.use("/api/events", eventRoute);
app.use("/api/reg", regroute);

app.use("/api/events",eventRoute);
app.use("/api/reg",regroute);

app.use("/api/suppliers", supplierRoute);

app.use("/api/bookings",bookingRoute);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
