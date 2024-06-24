const path = require("path");
const express = require("express");
const {connectMongoDB} = require("./connection")
const cookieParser = require('cookie-parser')
const { checkForAuthenticationCookie } = require("./middlewares/authentication");

const Blog = require("./models/blog")

const userRoute = require("./routes/user");
const blogRoute = require("./routes/blog")

const app = express();
const PORT = 8001;

//COnnect to mongoDB using mongoose
connectMongoDB("mongodb://127.0.0.1:27017/blogprojectNode");

//Middlewares
app.use(express.urlencoded({extended: false})) // Middleware to handle form data
app.use(cookieParser())
app.use(checkForAuthenticationCookie("token"))
app.use(express.static(path.resolve('./public')))

app.set("view engine","ejs");
app.set("views", path.resolve("./views"));

app.get("/",async (req,res)=>{
    const allBlogs = await Blog.find({}).sort({createdAt: -1})
    res.render("home",{
        user: req.user,
        allBlogs: allBlogs
    })
})

app.use("/user",userRoute);
app.use("/blog",blogRoute)


app.listen(PORT, () => {
    console.log("Server is running in port " + PORT);
})