const express = require("express");

const dotenv = require("dotenv");

const connectDB = require("./config/db");

const routes = require("./routes/routes");

const cors = require("cors");

const cookieParser = require("cookie-parser");

dotenv.config();
connectDB();

const app = express();

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:4200"],
  })
);

app.use(cookieParser());

app.use(express.json());

app.use(routes);

const PORT = process.env.PORT || 5000;

app.listen(5000, console.log(`Server started ${PORT}`));
