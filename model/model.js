const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    uid: String,
    pid: String,
    created_at: String,
    humidlevel: Number,
    AIWatering: Boolean,
    autoWatering: Boolean,
    manualWatering: Boolean,
    latitude: {
        type: String,
        required: true,
    },
    longitude: {
        type: String,
        required: true,
    },
    projectName: {
        type: String,
        required: true,
    }

})
const espSchema = new mongoose.Schema({
    uid: String, 
    pid: String,
    espName: String,
    created_at: String,
    feeds:[
        {
            entryId: Number,
            field1: Number
        }
    ]
})
const pumpSchema = new mongoose.Schema({
    pid:String,
    pumpName: String,
    entryId: Number,
    value: Number
})
const projects = mongoose.model("project", projectSchema)
const esps = mongoose.model("esp", espSchema)
const pumps = mongoose.model("pumps", pumpSchema)

module.exports = { projects,esps,pumps }