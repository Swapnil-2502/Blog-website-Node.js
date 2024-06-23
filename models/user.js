const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    FullName:{
        type: String,
        required: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profileImageUrl:{
        type:String,
        default:"./images/default.avif"
    },
    role:{
        type: String,
        enum: ["USER","ADMIN"],
        default: "USER"
    }
},{timestamps:true})

const User = mongoose.model("user",userSchema)

model.exports = User;