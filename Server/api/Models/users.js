const mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
    name:String,
    email:String,
    phone:Number,
    password:String,
    gender:Number,
    department:String,
    address:String,
    description:String,
    Status:Number
});

mongoose.model('User',UserSchema);