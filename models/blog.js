const mongoose = require("mongoose");

const userBlog = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    body:{
        type: String,
        required: true
    },
    coverImgURL:{
        type: String
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }
},{timestamps:true})

const BLOG = mongoose.model("Blogs",userBlog);

module.exports = BLOG;