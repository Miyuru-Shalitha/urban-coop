import "dotenv/config";
import express from "express";
import employeeRoute from "../routes/employee.route";
import authRoute from "../routes/auth.route";
import logger from "../middlewares/logger.middleware";
import cors from "cors";
import bodyParser from "body-parser";
import connect from "../config/db.config";
import router from "../routes/Event.route";

const app = express();
const port = process.env.PORT!;

// Middlewares
app.use(express.json());
app.use(cors());
app.use(logger);

connect();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// Routes
app.use("/api/auth", authRoute);
app.use("/api/employees", employeeRoute);

app.use("/api/event", router);

// JUST FOR TESTING
app.use("/", (req, res) => {
  res.send("Hello, from Node API!");
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
