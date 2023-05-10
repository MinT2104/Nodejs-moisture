const { pumps} = require("../model/projectModel")

const pumpController = {
    addField: async(req,res)=>{
        try {
            const indexPump = await pumps.find()
            const newPump = new pumps({
                pid: req.body.pid,
                pumpName: req.body.pumpName,
                entryId: indexPump.length +1,
                value: req.body.value
            })
            await newPump.save();
            res.status(200).json(newPump)
            } catch (error) {
            res.status(500).json(error)
            }
    },
    getField: async(req,res)=>{
        try {
            const allPump = await pumps.find()
            res.status(200).json(allPump)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    getAField: async(req,res)=>{
        try {
            const aPump = await pumps.findOne({pid: req.params.pid})
            res.status(200).json(aPump)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    putField: async(req, res)=>{
        try {
            const project = await pumps.findOneAndUpdate({pid: req.params.pid},{$set:{...req.body}},{new: true})
            res.status(200).json(project)
            } catch (error) {
            res.status(500).json(error)
            }
    }, 
    delField: async(req,res)=>{
        try {
            const AllFeed = await pumps.deleteOne({pid: req.params.pid})
            res.status(200).json(AllFeed)
        } catch (error) {
            res.status(500).json(error)
        }
    },
}
module.exports = pumpController 