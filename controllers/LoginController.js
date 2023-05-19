
const user = require("../model/userModel")
const uuid = require("uuid")
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");

dotenv.config();
const loginController = {
    login: async (req,res)=>{
        try {
            userReq = req.body
            if(userReq.username && userReq.password){
                const userExisted = await user.find({username: userReq.username})
                const userResponse = {
                    username: userExisted[0]?.username,
                    uid: userExisted[0]?.uid,
                    email: userExisted[0]?.email,
                    displayName: userExisted[0]?.displayName,
                    photoURL: userExisted[0]?.photoURL,
                    phoneNumber: userExisted[0]?.phoneNumber,
                    accessToken: userExisted[0]?.accessToken,
                    isActive: userExisted[0]?.isActive,
                    updatedAt: userExisted[0]?.updatedAt,
                    createdAt: userExisted[0]?.createdAt,
                }
                if(userExisted.length === 0){
                    res.status(404).json("User not found")
                }else{
    
                 bcrypt.compare(userReq.password, userExisted[0].password)
                    .then((result) => {
                        const isSignup = result;
                        if(!isSignup){
                            res.status(401).json("Invalid password")
                        }else{
                            res.status(200).json(userResponse)
                        }
                    })
                    .catch((error)=>{
                        res.status(500).json("sairoi")
                    })
                }

            }
            else{
                res.status(400).json("All fields required")
            }
           
        } catch (error) {
            res.status(500).json(error)
        }
    }
}
module.exports = loginController;