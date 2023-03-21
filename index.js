const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const projectRoute = require("./routes/Project");
const espRoute = require("./routes/Esp")
const pumpRoute = require("./routes/Pump")

const app = express();

dotenv.config();
app.use(bodyParser.json({limit: "50mb"}))
app.use(cors())
app.use(morgan("common"))

mongoose.connect((process.env.DB_URL)).then(
    ()=>{console.log("connected to db")},
    (error)=>{console.log("fail connection")}
)
app.use("/api/v1/projects", projectRoute)
app.use("/api/v1/esp_sensor", espRoute)
app.use("/api/v1/pump", pumpRoute)

app.listen(8080,()=>{
    console.log("server is running...")
})