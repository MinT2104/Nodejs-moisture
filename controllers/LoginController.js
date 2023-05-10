
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
            const userExisted = await user.find({username: userReq.username})
            if(userExisted.length === 0){
                res.status(404).json("User not found")
            }else{
               bcrypt.compare(userReq.password, userExisted.password)
                .then((result) => {
                    const isSignup = result;
                    if(!isSignup){
                        res.status(401).json("Invalid password")
                    }else{
                        const userRes = {
                            username: userExisted?.username,
                            uid: userExisted?.uid,
                            email: userExisted?.email,
                            displayName: userExisted?.displayName,
                            photoURL: userExisted?.photoURL,
                            phoneNumber: userExisted?.phoneNumber,
                            accessToken: userExisted?.accessToken,
                            isActive: userExisted?.isActive,
                            updatedAt: userExisted?.updatedAt,
                            createdAt: userExisted?.createdAt,
                        }
                        res.status(200).json(userRes)
                    }
                }).catch((error)=>{
                    res.status(500).json(error)
                })
            }
        } catch (error) {
            res.status(500).json(error)
        }
    }
}
module.exports = loginController;