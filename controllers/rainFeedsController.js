const { rainFeeds } = require("../model/rainAmount");
const moment = require("moment");

const rainFeedsController = {
  addFeed: async (req, res) => {
    try {
      if (req.body !== null) {
        const newRainFeed = new rainFeeds({
          ...req.body,
          date_query: moment(new Date()).endOf("date"),
        });
        await newRainFeed.save();

        res.status(200).json(newRainFeed);
      } else {
        res.status(401).json("Field1 is required");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getFeed: async (req, res) => {
    try {
      const field = await rainFeeds.where({
        pid: req.body.pid,
        generated_date: {
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
      const field = await rainFeeds.where({
        pid: req.body.pid,
      });
      res.status(200).json(field);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  delAnItemFeed: async (req, res) => {
    try {
      const newRain = await rainFeeds.findOneAndRemove(
        {
          pid: req.body.pid,
          generated_date: req.body.generated_date,
          field1: req.body.field1,
        },
        { new: true }
      );
      res.status(200).json(newRain);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = rainFeedsController;
