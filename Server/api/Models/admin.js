const mongoose = require('mongoose');
var AdminSchema = mongoose.Schema({
    email:String,
    password:String,
    role:Number
});

mongoose.model('Admin',AdminSchema);