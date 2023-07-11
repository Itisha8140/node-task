require('dotenv').config();
const express = require('express');
const app = express();
const db = require('./config/mongoose')
app.use(express. urlencoded({extended:true}));
app.use(express.json());
app.use('/imagesUplodes', express.static('imagesUplodes'))
app.get('/', (req,res)=>{
    res.send("Hello world !!!")
});
app.use('/api/v1/users', require('./routes/index'))
app.listen(1212, (err)=>{
    if(err){
        console.log("Server error: " + err);
    }
    console.log("server URL localhost://"+1212);
})