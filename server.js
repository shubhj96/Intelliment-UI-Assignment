var express = require('express');  
var path = require("path");   
var bodyParser = require('body-parser');  
var mongo = require("mongoose");  
  
var db = mongo.connect("mongodb://localhost:27017/IntellimentUI", function(err, response){  
   if(err){ console.log( err); }  
   else{ console.log('Connected to ' + db, ' + ', response); }  
});  
  
   
var app = express()  
app.use(bodyParser());  
app.use(bodyParser.json({limit:'5mb'}));   
app.use(bodyParser.urlencoded({extended:true}));  
   
  
app.use(function (req, res, next) {        
     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');    
     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');    
     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');      
     res.setHeader('Access-Control-Allow-Credentials', true);       
     next();  
 });  
  
 var Schema = mongo.Schema;  
  
var UsersSchema = new Schema({      
    login: {type : String},
    id: {type : Number},
    node_id: {type : String},
    avatar_url: {type : String},
    gravatar_id: {type : String},
    url: {type : String},
    html_url: {type : String},
    followers_url: {type : String},
    following_url: {type : String},
    gists_url: {type : String},
    starred_url: {type : String},
    subscriptions_url: {type : String},
    organizations_url: {type : String},
    repos_url: {type : String},
    events_url: {type : String},
    received_events_url: {type : String},
    type: {type : String},
    site_admin: Boolean,
    name: {type : String},
    compString : {type : String},
    blog: {type : String},
    location: {type : String},
    email : {type : String},
    hireable : {type : String},
    bio: {type : String},
    public_repos: {type : Number},
    public_gists: {type : Number},
    followers: {type : Number},
    following: {type : Number},
    created_at: {type : Date},
    updated_at: {type : Date},   
});  
   
  
var model = mongo.model('users', UsersSchema, 'users');  
  
app.post("/api/SaveUser",function(req,res){   
 var mod = new model(req.body);  
 if(req.body.mode =="Save")  
 {  
    mod.save(function(err,data){  
      if(err){  
         res.send(err);                
      }  
      else{        
          res.send({data:"Record has been Inserted..!!"});  
      }  
 });  
}  
else   
{  
 model.findByIdAndUpdate(req.body.id, { name: req.body.name, address: req.body.address},  
   function(err,data) {  
   if (err) {  
   res.send(err);         
   }  
   else{        
          res.send({data:"Record has been Updated..!!"});  
     }  
 });  
  
  
}  
 })    
  
  
app.listen(8080, function () {  
    
 console.log('Example app listening on port 8080!')  
})  