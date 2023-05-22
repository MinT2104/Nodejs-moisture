const { noti} = require("../model/projectModel")

const notiController = {
    addNewnoti: async(req,res) =>{
        try {
            const newNoti = new noti( req.body )
            await newNoti.save();
            res.status(200).json(newNoti)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    getUserNoti: async(req,res)=>{
        try {
            const notiFind = await noti.find({uid: req.body.uid})
            res.status(200).json(notiFind)
        } catch (error) {
            res.status(500).json(error)
        }

    }
}
module.exports = notiController