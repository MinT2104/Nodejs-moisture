const mongoose = require("mongoose");

const rainSChema = new mongoose.Schema({
    uid: String,
    pid:String,
    espName:String,
    created_at: { type: Date, default: Date.now },
    feeds:[
        {
            created_at: { type: Date, default: Date.now },
            entryId: Number,
            field1: String
        }
    ]
})
const rain = mongoose.model('rain', rainSChema);
module.exports = rain 