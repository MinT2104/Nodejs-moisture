const mongoose = require("mongoose");

const rainSChema = new mongoose.Schema({
  uid: String,
  pid: String,
  espName: String,
  created_at: { type: Date, default: Date.now },
});
const rainFeedSChema = new mongoose.Schema({
  pid: String,
  date_query: Date,
  generated_date: Date,
  generated_time: Date,
  unit: String,
  field1: String,
});

const rain = mongoose.model("rain", rainSChema);
const rainFeeds = mongoose.model("rainFeed", rainFeedSChema);
module.exports = { rainFeeds, rain };
