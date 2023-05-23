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

    },
    updateNoti: async(req,res)=>{
        try {
            const updateNoti = await noti.findOneAndUpdate({pid: req.body.pid, created_at: req.body.created_at},{$set:{isRead: req.body.isRead}},{new: true})
            res.status(200).json(updateNoti)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    deleteNoti: async(req,res)=>{
        try {
            for(i=0;i<req.body.created_at.length;i++){
                await noti.findOneAndDelete({uid: req.body.uid, created_at: req.body.created_at[i]},{new: true})
            }
            res.status(200).json("delete successfully!")
        } catch (error) {
            res.status(500).json(error)
        }
    }
}
module.exports = notiController