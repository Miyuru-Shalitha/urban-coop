import bodyParser from "body-parser";
import cors from "cors";
import "dotenv/config";
import express from "express";
import connect from "../config/db.config";
import logger from "../middlewares/logger.middleware";
import adaptionRequestRoute from "../routes/adaptionRequest.route";
import authRoute from "../routes/auth.route";
import bookingRoute from "../routes/booking.route";
import employeeRoute from "../routes/employee.route";
import employeeAuthRoute from "../routes/employeeAuth.route";
import petRoute from "../routes/pet.route";
import roleRoute from "../routes/role.route";


import eventRoute from "../routes/Event.route";
import regroute from "../routes/eventRegister.route";

import itemRoute from "../routes/item.route";

import supplierRoute from "../routes/supplier.route";
import register from "../routes/UserRegister.route"
import login from "../routes/userLogin.route"
import feedbackRoutes from "../routes/feedbackRoutes";


const app = express();
const port = process.env.PORT!;
app.use('/uploads', express.static('uploads'));

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
app.use("/api/pets", petRoute);
app.use("/api/adoptionrequests", adaptionRequestRoute);
app.use("/api/events", eventRoute);
app.use("/api/reg", regroute);

<<<<<<< HEAD
app.use("/api/events",eventRoute);
app.use("/api/reg",regroute);


app.use("/api/items",itemRoute);
app.use("/api/suppliers", supplierRoute);

=======


>>>>>>> cfc6e7c402f2004a64ff94d4027117a434e929fe
app.use("/api/bookings",bookingRoute);

app.use('/api/feedback', feedbackRoutes);

app.use("/api/register",register);
app.use("/api",login);



app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
