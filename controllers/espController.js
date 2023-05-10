const { esps} = require("../model/projectModel")

const espController = {
    addField: async(req,res)=>{
        try {
            const newEsp = new esps(req.body)
            await newEsp.save();
            res.status(200).json(newEsp)
            } catch (error) {
            res.status(500).json(error)
            }
    },
        addFeed: async(req,res)=>{
        try {
            const espEntry = await esps.where({pid: req.params.pid})
            const newObject = {
                entryId: espEntry[0].feeds.length +1,
                field1: req.body.field1
            }
            const espChosen = await  esps.findOneAndUpdate({pid: req.params.pid},{$push: {feeds: newObject}},{new:true})
            res.status(200).json(espChosen)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    getField: async(req,res)=>{
        try {
            const AllField = await esps.find()
            res.status(200).json(AllField)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    getAField: async(req,res)=>{
        try {
            const AFeild = await esps.findOne({pid: req.params.pid})
            res.status(200).json(AFeild)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    getUserField: async(req,res)=>{
        try {
            const UserField = await esps.find({uid: req.query.uid})
            res.status(200).json(UserField)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    delField: async(req,res)=>{
        try {
            const AllFeed = await esps.deleteOne({pid: req.params.pid})
            res.status(200).json(AllFeed)
        } catch (error) {
            res.status(500).json(error)
        }
    },
}
module.exports = espController 