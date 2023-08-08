const jwt = require("jsonwebtoken");
const user = require("../model/userModel");
const dotenv = require("dotenv");

dotenv.config();

const middlware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(403).json({ message: "Access token is required" });
  } else {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.SECRET_TOKEN, (err, decoded) => {
      res.status(200).json(err);
    });

    // try {
    //     reqUser = decoded.username

    //     // availableUser = user.find({username: reqUser})

    //     // if (availableUser[0] === null) {
    //     //   return res.status(403).json({ message: 'Access denied' });
    //     // }else{
    //     //     next();
    //     // }
    //   } catch (error) {
    //     return res.status(401).json({ message: 'Invalid access token' });
    //   }
  }
};

module.exports = middlware;
