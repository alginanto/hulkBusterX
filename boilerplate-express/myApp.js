let express = require('express');
let app = express();
let path = require('path')
const bodyParser=require('body-parser')
require('dotenv').config()

app.use(bodyParser.urlencoded({extended: false}))
app.use(function middleware(req, res, next) {

    console.log(`${req.method} ${req.path} - ${req.ip}`) 
      
     next();
   
   });
app.get("/",(req,res)=>{
    res.sendFile(__dirname + '/views/index.html')
})
app.get("/json",(req,res)=>{
 if(process.env.MESSAGE_STYLE=='uppercase'){
    res.json({"message": "HELLO JSON"})
 }else{
    res.json({"message": "Hello json"})
 }

})

app.get("/now",function(req,res,next){
   req.time= new Date().toString()
   next()
},function(req,res){
   res.json({"time":req.time})
})

app.get("/:word/echo",function(req,res){
 res.json({"echo":req.params.word})

})


app.route("/name").get(function(req,res,next){
   var{first:firstName, last:lastName}=req.query;
  
   res.json({"name":`${firstName} ${lastName}`});
}).post(function(req,res,next){
   var  string  = req.body.first + " " + req.body.last;
  
   res.json({name: string});
})


app.use('/public', express.static(path.join(__dirname, '/public')))



































 module.exports = app;
