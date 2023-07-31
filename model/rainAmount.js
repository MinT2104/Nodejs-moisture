const mongoose = require("mongoose");

const rainSChema = new mongoose.Schema({
  uid: String,
  pid: String,
  espName: String,
  created_at: { type: Date, default: Date.now },
  feeds: [
    {
      generated_date: String,
      generated_time: String,
      unit: String,
      entryId: Number,
      field1: String,
    },
  ],
});
const rain = mongoose.model("rain", rainSChema);
module.exports = rain;
