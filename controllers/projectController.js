const {projects} = require("../model/model")

const projectController = {
    getAProject: async(req, res)=>{
        try {
            const project = await projects.where({pid: req.params.pid})
            res.status(200).json(project)
            console.log(project)
            } catch (error) {
            res.status(500).json(error)
            }
    }, 
    getAllProject: async(req, res)=>{
        try {
            const Allproject = await projects.find()
            res.status(200).json(Allproject)
            } catch (error) {
            res.status(500).json(error)
            }
    }, 
    getAllUserProject: async(req, res)=>{
        try {
            const Allproject = await projects.where({uid: req.params.uid})
            res.status(200).json(Allproject)
            } catch (error) {
            res.status(500).json(error)
            }
    }, 

    postProject: async(req,res)=>{
        try {
        const newProject = new projects(req.body)
        const saveProject = await newProject.save();
        res.status(200).json(saveProject)
        } catch (error) {
        res.status(500).json(error)
        }
    },
    putAProject: async(req, res)=>{
        try {
            const project = await projects.findOneAndUpdate({pid: req.params.pid},{$set:{...req.body}},{new: true})
            res.status(200).json(project)
            } catch (error) {
            res.status(500).json(error)
            }
    }, 
    deleteAProject: async(req, res)=>{
        try {
            const project = await projects.deleteOne({pid: req.params.pid})
            res.status(200).json(project)
            } catch (error) {
            res.status(500).json(error)
            }
    }, 



}

module.exports = projectController;