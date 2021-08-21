const mongoose = require('mongoose');

const mongoDB = 'mongodb://localhost/LeaveDB';

mongoose.connect(mongoDB,{useNewUrlParser:true,useUnifiedTopology:true},(error) => {
    if(!error)
    {
        console.log("Database Connected Successfully!");
    }
    else
    {
        console.log("Fail to Connect Database");
    }
});

require('./admin');
require('./users');