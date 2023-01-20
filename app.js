require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
const db = require("./db/connect-db");
//middlewares
const errorHandler = require("./middleware/error-handler");
const notFound = require("./middleware/notFound");

//routes
const authRoutes = require("./routes/auth");
const scheduleRoutes = require("./routes/schedule");

app.use(express.json());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/", scheduleRoutes);

app.use(errorHandler);
app.use(notFound);

const port = process.env.PORT || 3000;

const start = async () => {
  await db(process.env.MONGO_URI);
  app.listen(port, () => {
    console.log(`Server is listening on port ${port}...`);
  });
};

start();
