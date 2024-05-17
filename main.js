require('dotenv').config();
const express=require('express');
const mongoose=require('mongoose');
const session=require('express-session');
const cookieParser=require("cookie-parser");



const app=express();
const PORT=process.env.PORT || 7000;

// make Middleware
app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use(session({
    secret : process.env.SecretKey,
    saveUninitialized : true,
    resave : true,
    cookie : {maxAge : 24 * 60 * 60 * 1000}
}))

app.use((req,res,next)=>{
    res.locals.message=req.session.message;
    delete req.session.message;
    next();
})
app.use(express.static("uploads"))
app.use(cookieParser());

//templet engine
// app.set("views",'views')
app.set('view engine','ejs');


//Database conection
mongoose.connect(process.env.DB_URI).then(()=>{
    console.log("Dtabase connect");
}).catch((error)=>{
    console.log(error);
});


//routes

app.use("",require('./routes/routes'))
app.use("",require('./routes/userRoutes'))
app.listen(PORT, ()=>{
    console.log(`Server start at http://localhost:${PORT}`);
})
