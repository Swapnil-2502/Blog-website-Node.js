const path = require("path");
const express = require("express");
const {connectMongoDB} = require("./connection")
const cookieParser = require('cookie-parser')
const { checkForAuthenticationCookie } = require("./middlewares/authentication");

const userRoute = require("./routes/user");


const app = express();
const PORT = 8001;

//COnnect to mongoDB using mongoose
connectMongoDB("mongodb://127.0.0.1:27017/blogprojectNode");

//Middlewares
app.use(express.urlencoded({extended: false})) // Middleware to handle form data
app.use(cookieParser())
app.use(checkForAuthenticationCookie("token"))

app.set("view engine","ejs");
app.set("views", path.resolve("./views"));

app.get("/", (req,res)=>{
    res.render("home",{
        user: req.user
    })
})

app.use("/user",userRoute);


app.listen(PORT, () => {
    console.log("Server is running in port " + PORT);
})