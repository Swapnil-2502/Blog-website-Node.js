const {Router} = require("express")
const { createHmac } = require('node:crypto');
const User = require("../models/user")

const router = Router()

router.get("/signin", (req,res)=>{
    return res.render("signin")
})

router.get("/signup", (req,res)=>{
    return res.render("signup")
})

router.post("/signin", async(req,res)=>{
    const {email,password} = req.body;

    const user = await User.matchPassword(email,password)
    
    console.log('User: ',user)
    return res.redirect("/");
    
    // try{
    //     const user = await User.findOne({email});

    //     if(!user) return res.status(400).send("Invalid email or password")

    //     const hashedPassword = createHmac('sha256', user.salt)
    //                             .update(password)
    //                             .digest('hex');

    //     // Compare the hashed passwords
    //     if (hashedPassword !== user.password) {
    //         return res.status(400).send("Invalid password.");
    //     }

    //     return res.redirect("/");
    // }
    // catch(error){
    //     console.error(error);
    //     return res.status(500).send("Internal server error.");
    // }

})

router.post("/signup", async (req,res)=>{
    const { FullName, email, password } = req.body;

    await User.create({
        FullName,
        email,
        password
    })

    return res.render("signin")
})

module.exports = router;