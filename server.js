console.log("Starting App. . .");
const express = require("express");
const hbs = require("hbs");
const os= require("os");
const app = express();
const fs = require("fs");

app.set("view engine", "hbs");
hbs.registerPartials(__dirname + "/partials");
hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
});
hbs.registerHelper('getOwner',()=>{
    return os.userInfo().username;
});
hbs.registerHelper('screamIt', (text)=>{
    return text.toUpperCase();
});

//__________________________________
//...........MIDDLEWARE...................
//..sets up a directory that can be accessed from the browser

app.use((req,res,next)=>{
    var now = new Date().toString();
    var log = `${now} \t ${req.method} \t ${req.url}`
    
    console.log(log);
    fs.appendFileSync('server.log', log + '\n')
    next();
});

app.use((req,res,next)=>{
    res.render("maintenance.hbs");
});

app.use(express.static(__dirname+"/public"));
app.get("/",(req,res)=>{
    res.render("home.hbs",{
        pageTitle: "Home Page"
        // currentYear: new Date().getFullYear(),
        // owner: os.userInfo().username
    })
});
app.get("/about",(req,res)=>{
    res.render("about.hbs",{
        pageTitle: "About Page"
        // currentYear: new Date().getFullYear()
    })});

app.get("/bad",(req,res)=>{
    res.send({
        errorMessage: "Unable to handle request."
    });
});

app.listen(3000,()=>{
    console.log("Server is running on port 3000. . .");
});