const mongoose = require('mongoose');
const db = mongoose.connect("mongodb+srv://preetivardhanam:pQek1lzdGnT50Bqn@cluster0.c7j3tlu.mongodb.net/auth");
if(db){
console.log("Db is connected");
}else{
    console.log("Db is not connected");
}
module.exports= db;