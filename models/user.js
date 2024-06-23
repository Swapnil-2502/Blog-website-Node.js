const { createHmac, randomBytes } = require('node:crypto');
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
    salt:{
        type: String,
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

//Middleware to hash password
userSchema.pre("save",function(next){
    const user = this;

    if(!user.isModified("password")) return 

    const salt = randomBytes(16).toString();
    const hashedPassword = createHmac('sha256', salt)
                            .update(user.password)
                            .digest('hex');
    
    this.salt = salt;
    this.password = hashedPassword;

    next();
})

userSchema.static('matchPassword',async function(email,password){
    const user = await this.findOne({email})

    if(!user) throw new Error("User not found");

    const salt = user.salt
    const hashedPassword = user.password

    const Providedpassword = createHmac('sha256', salt)
                            .update(password)
                            .digest('hex');

    if(hashedPassword !== Providedpassword) throw new Error("Incorrect Password")                    

    return user
})

const User = mongoose.model("user",userSchema)

module.exports = User;