const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const projectRoute = require("./routes/projectRoute");
const espRoute = require("./routes/espRoute");
const pumpRoute = require("./routes/pumpRoute");
const userRoute = require("./routes/userRoute");
const noti = require("./routes/notiRoute");
const rainRoute = require("./routes/rainRoute");
// const uuidv4 = require("uuidv4")

const app = express();

dotenv.config();
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());
app.use(morgan("common"));
// app.use(uuidv4())

mongoose.connect(process.env.DB_URL).then(
  () => {
    console.log("connected to db");
  },
  (error) => {
    console.log("fail connection");
  }
);
app.use("/api/v1/projects", projectRoute);
app.use("/api/v1/esp_sensor", espRoute);
app.use("/api/v1/pump", pumpRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/noti", noti);
app.use("/api/v1/rain", rainRoute);

app.listen(8080, () => {
  console.log("server is running...");
});
