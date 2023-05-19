const mongoose = require("mongoose");

const userSChema = new mongoose.Schema({
    uid: String,
    username: String,
    password: String,
    email: String,
    displayName: String,
    multiProject: Array,
    photoURL: String,
    phoneNumber: String,
    accessToken:String,
    isActive: Boolean,
})
userSChema.plugin(require('mongoose-timestamp'));
const user = mongoose.model('user', userSChema);
module.exports = user 