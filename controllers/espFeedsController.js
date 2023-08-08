const { espFeeds } = require("../model/projectModel");
const moment = require("moment");

const espFeedsController = {
  addFeed: async (req, res) => {
    try {
      if (req.body !== null) {
        const newEspFeed = new espFeeds({
          ...req.body,
          pid: req.query.pid,
          date_query: moment(new Date()).endOf("date"),
        });
        await newEspFeed.save();

        res.status(200).json(newEspFeed);
      } else {
        res.status(401).json("Field1 is required");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getFeed: async (req, res) => {
    try {
      const field = await espFeeds.find({
        pid: req.body.pid,
        created_at: {
          $gte: moment(req.body.start),
          $lte: moment(req.body.end),
        },
      });
      res.status(200).json(field);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getAllFeed: async (req, res) => {
    try {
      const field = await espFeeds.where({
        pid: req.body.pid,
      });
      res.status(200).json(field);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = espFeedsController;
