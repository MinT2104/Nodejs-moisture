
const user = require("../model/userModel")
const uuid = require("uuid")
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");

dotenv.config();
const signupController = {
    signup: async(req, res)=>{
    try {
        const userProperties = req.body
        if(userProperties.username && userProperties.password && userProperties.photoURL){
            const currentUser = await user.find({username: userProperties.username})
            if(currentUser.length === 0){
                try {
                const userToken =  userProperties.username

                const salt = bcrypt.genSaltSync(10);
                const PWHashedString = (await bcrypt.hash(userProperties.password, salt)).toString();                
                const accessToken = jwt.sign({ userToken }, process.env.SECRET_TOKEN, { expiresIn: '1h' });

                const newUser = new user({
                    username: userProperties.username,
                    password: PWHashedString,
                    uid: uuid.v4(),
                    email: "",
                    displayName: userProperties.username,
                    photoURL: userProperties.photoURL,
                    phoneNumber: "",
                    accessToken: accessToken,
                    isActive: true
                })
                    await newUser.save();
                 res.status(200).json(newUser)
                } catch (error) {
                 res.status(500).json(error)
                }
            }
            else{
                res.status(409).json("Username has been existed")
            }
        }
    } catch (error) {
        res.status(500).json(error)
    }
 },
//  getUser: async (req,res)=>{
//     const allUser = await user.find()
//     res.status(200).json(allUser)
//  }   
}
module.exports = signupController;