const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');

const app = express();

app.use(cors({origin:true,credentials: true}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = '3001';
app.listen(port, ()=> {
    console.log("Server is running on port", + port);
});

require('./api/Models/database');
app.use('/api/',require('./api/Routes/adminroute')(express));


module.exports = app;