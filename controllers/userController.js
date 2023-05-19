
const user = require("../model/userModel")
const uuid = require("uuid")
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");

dotenv.config();
const userController = {
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
                    multiProject: [],
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
 login: async (req,res)=>{
    try {
        userReq = req.body
        if(userReq.username && userReq.password){
            const userExisted = await user.find({username: userReq.username})
            const userResponse = {
                username: userExisted[0]?.username,
                uid: userExisted[0]?.uid,
                email: userExisted[0]?.email,
                multiProject: userExisted[0].multiProject,
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
},
getAUser: async (req,res)=>{
    try {
        const uid = req.body.uid
        const foundUser = await user.find({uid: uid})
        if(foundUser[0]){
            res.status(200).json(foundUser[0])
        }else{
            res.status(404).json("user not found")
        }
    } catch (error) {
        res.status(500).json(error)
    }
},
AddFirebaseUser: async(req,res)=>{
        try {
            userProperties = req.body
            const newUser = new user({
                username: userProperties.username,
                uid: userProperties.uid,
                email: "",
                multiProject: userProperties.multiProject,
                displayName: userProperties.username,
                photoURL: userProperties.photoURL,
                phoneNumber: "",
                accessToken: userProperties.accessToken,
                isActive: true
            })
            await newUser.save();
            res.status(200).json(newUser)
        } catch (error) {
              res.status(500).json(error)
        }
},
updateUser: async(req,res)=>{
    try {
        const newPid = await  user.findOneAndUpdate({uid: req.body.uid},{$push: {multiProject: req.body.pid}},{new:true})
        res.status(200).json(newPid)
    } catch (error) {
        res.status(500).json(error)
    }
}
}
module.exports = userController;