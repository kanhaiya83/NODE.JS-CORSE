const path=require("path")
const hbs=require("hbs")
const express=require("express")
const app=express()

const port = process.env.PORT || 3000

const geocode=require("../utils/geocode")
const forecast=require("../utils/forecast")


const staticDirectory=path.join(__dirname,"../public")
const viewsDirectory=path.join(__dirname,"../templates/views")
const partialsPath=path.join(__dirname,"../templates/partials")

app.set("view engine","hbs")
app.set("views",viewsDirectory)
app.use(express.static(staticDirectory))
hbs.registerPartials(partialsPath)
// Main Code

app.get("",(req,res)=>{
    res.render("index",{
        title:"Weather app",
        name:"Ankit"
    })
})

app.get("/about",(req,res)=>{
    res.render("about",{
        title:"About Me",
        name:"Ankit"
    })
})

app.get("/help",(req,res)=>{
    res.render("help",{
        title:"Help",
        name:"Ankit"
    })
})

app.get("/weather",(req,res)=>{
    const  queryObj=req.query
    if(!queryObj.address){
        return res.send("No address was provided")
    }  
    geocode(queryObj.address,(error,{longitude,latitude,location}={})=>{
        console.log({longitude,latitude,location})
        if(error){
            
            return res.send({error})
        }
        forecast(longitude,latitude,(error,forecastMsg)=>{
            if(error){
                 res.send({error})
            }
            else{
                res.send({
                "forecast":forecastMsg,
                "address":location
             })
            }
        })


        
        
    })
    
})


app.get("*",(req,res)=>{
    res.render("404",{
        title:"404",
        error:"Requested page couldn't be found",
        name:"ankit"
    })
})

app.get("/help/*",(req,res)=>{
    res.render("404",{
        title:"404",
        error:"Requested help article couldn't be found",
        name:"ankit"
    })
})


// Listening on port 3000
app.listen(port,()=>{
    console.log("Server is up on "+port)
})