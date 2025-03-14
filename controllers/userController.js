const user = require("../model/userModel");
const uuid = require("uuid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();
const userController = {
  signup: async (req, res) => {
    try {
      const userProperties = req.body;
      if (
        userProperties.username &&
        userProperties.password &&
        userProperties.photoURL
      ) {
        const currentUser = await user.find({
          username: userProperties.username,
        });
        if (currentUser.length === 0) {
          try {
            const userToken = userProperties.username;

            const salt = bcrypt.genSaltSync(10);
            const PWHashedString = (
              await bcrypt.hash(userProperties.password, salt)
            ).toString();
            const accessToken = jwt.sign(
              { userToken },
              process.env.SECRET_TOKEN,
              { expiresIn: "1h" }
            );

            const newUser = new user({
              username: userProperties.username,
              password: PWHashedString,
              uid: uuid.v4(),
              email: userProperties.email,
              multiProject: [],
              displayName: userProperties.username,
              photoURL: userProperties.photoURL,
              phoneNumber: "",
              accessToken: accessToken,
              isActive: true,
            });
            await newUser.save();
            res.status(200).json(newUser);
          } catch (error) {
            res.status(500).json(error);
          }
        } else {
          res.status(409).json("Username has been existed");
        }
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
  login: async (req, res) => {
    try {
      userReq = req.body;
      // const userExisted = await user.find({username: userReq.username})
      // res.status(200).json(userExisted.length )
      if (userReq.username && userReq.password) {
        const userExisted = await user.find({ username: userReq.username });
        if (userExisted.length === 1) {
          const userResponse = {
            username: userExisted[0].username,
            uid: userExisted[0].uid,
            email: userExisted[0].email,
            multiProject: userExisted[0].multiProject,
            displayName: userExisted[0].displayName,
            photoURL: userExisted[0].photoURL,
            phoneNumber: userExisted[0].phoneNumber,
            accessToken: userExisted[0].accessToken,
            isActive: userExisted[0].isActive,
            updatedAt: userExisted[0].updatedAt,
            createdAt: userExisted[0].createdAt,
            projectAmount: userExisted[0].projectAmount,
            espAmount: userExisted[0].espAmount,
            pumpAmount: userExisted[0].pumpAmount,
          };
          bcrypt
            .compare(userReq.password, userExisted[0].password)
            .then((result) => {
              const isSignup = result;
              if (!isSignup) {
                res.status(401).json("Invalid password");
              } else {
                res.status(200).json(userResponse);
              }
            })
            .catch((error) => {
              res.status(500).json(error);
            });
        } else {
          res.status(404).json("User not found");
        }
      } else {
        res.status(400).json("All fields required");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getAUser: async (req, res) => {
    try {
      const uid = req.body.uid;
      const foundUser = await user.find({ uid: uid });
      if (foundUser[0]) {
        res.status(200).json(foundUser[0]);
      } else {
        res.status(404).json("user not found");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
  AddFirebaseUser: async (req, res) => {
    try {
      userProperties = req.body;
      const newUser = new user({
        username: userProperties.username,
        uid: userProperties.uid,
        email: userProperties?.email || "",
        multiProject: userProperties.multiProject,
        displayName: userProperties.username,
        photoURL: userProperties.photoURL,
        phoneNumber: "",
        address: "",
        projectAmount: 0,
        espAmount: 0,
        pumpAmount: 0,
        accessToken: userProperties.accessToken,
        isActive: true,
      });
      await newUser.save();
      res.status(200).json(newUser);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  updateUserPid: async (req, res) => {
    try {
      const newPid = await user.findOneAndUpdate(
        { uid: req.body.uid },
        { $push: { multiProject: req.body.pid } },
        { new: true }
      );
      res.status(200).send("Add successfully");
    } catch (error) {
      res.status(500).json(error);
    }
  },
  updateUserprop: async (req, res) => {
    try {
      const userProject = await user.findOneAndUpdate(
        { uid: req.body.uid },
        { $set: { ...req.body } },
        { new: true }
      );
      res.status(200).json(userProject);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  delUserPid: async (req, res) => {
    try {
      const newPid = await user.findOneAndUpdate(
        { uid: req.body.uid },
        { $pull: { multiProject: req.body.pid } },
        { new: true }
      );
      res.status(200).send("Delete successfully");
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = userController;
