const mongoose = require('mongoose');
const schema = mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    token:{
        type:String,
        required:true
    },
});
const auth = mongoose.model('auth', schema);
module.exports = auth