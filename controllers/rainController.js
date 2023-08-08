const { rain } = require("../model/rainAmount");
const moment = require("moment/moment");

const rainController = {
  newRan: async (req, res) => {
    try {
      const rainReq = req.body;
      const currentRain = await rain.where({ pid: rainReq.pid });
      // res.status(200).json(currentRain)
      if (currentRain.length === 0) {
        const newRain = new rain(rainReq);
        await newRain.save();
        res.status(200).json("Create Successfully");
      } else {
        res.status(409).json("Rain has been existeds");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getOne: async (req, res) => {
    try {
      const data = await rain.findOne({ pid: req.body.pid });
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getAllUserRain: async (req, res) => {
    try {
      const data = await rain.where({ uid: req.body.uid });
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = rainController;
