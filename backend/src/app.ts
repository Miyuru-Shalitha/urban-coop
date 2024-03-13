import "dotenv/config";
import express from "express";
import employeeRoute from "../routes/employee.route";
import authRoute from "../routes/auth.route";
import logger from "../middlewares/logger.middleware";
import cors from "cors";

const app = express();
const port = process.env.PORT!;

// Middlewares
app.use(express.json());
app.use(cors());
app.use(logger);

// Routes
app.use("/api/auth", authRoute);
app.use("/api/employees", employeeRoute);

// JUST FOR TESTING
app.use("/", (req, res) => {
  res.send("Hello, from Node API!");
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
