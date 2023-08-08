const mongoose = require("mongoose");
const moment = require("moment");

const projectSchema = new mongoose.Schema({
  uid: String,
  pid: String,
  humidLevel: Number,
  created_at: String,
  humidlevel: Number,
  AIWatering: Boolean,
  autoWatering: Boolean,
  manualWatering: Boolean,
  isPump: Boolean,
  isEsp: Boolean,
  rainFall: String,
  depth_level_1: String,
  depth_level_2: String,
  type: String,
  latitude: {
    type: String,
    required: true,
  },
  longitude: {
    type: String,
    required: true,
  },
  projectName: {
    type: String,
    required: true,
  },
});
const espSchema = new mongoose.Schema({
  uid: String,
  pid: String,
  espName: String,
  created_at: String,
});
const espFeedSchema = new mongoose.Schema({
  created_at: { type: Date, default: Date.now },
  date_query: Date,
  pid: String,
  field1: String,
  field2: String,
});
const pumpSchema = new mongoose.Schema({
  pid: String,
  pumpName: String,
  entryId: Number,
  value: Number,
});
const NotiSchema = new mongoose.Schema({
  pid: String,
  uid: String,
  projectName: String,
  message: String,
  isRead: Boolean,
  created_at: { type: Date, default: Date.now },
});
const projects = mongoose.model("project", projectSchema);
const esps = mongoose.model("esp", espSchema);
const pumps = mongoose.model("pumps", pumpSchema);
const noti = mongoose.model("noti", NotiSchema);
const espFeeds = mongoose.model("espFeeds", espFeedSchema);

module.exports = { projects, esps, pumps, noti, espFeeds };
