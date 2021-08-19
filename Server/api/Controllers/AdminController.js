'use strict';

var mongoose = require('mongoose');
var Admin = mongoose.model('Admin');

module.exports = {
    adminLogin:adminLogin
}

function adminLogin(req,res)
{
    if(req.body.email == "")
    {
        return res.json({
            'status':300,
            'message': 'Please enter an email'
        });
    }
    else if(req.body.password == "")
    {
        return res.json({
            'status':300,
            'message': 'Please enter password'
        });
    }
    else
    {
        Admin.countDocuments({email:req.body.email,password:req.body.password}).then(count => {
            if(count > 0)
            {
                return res.json({
                    'status':200,
                    'message': 'Login Successfully!',
                    'data': req.body.email
                });
            }
            else
            {
                return res.json({
                    'status':300,
                    'message': 'Invalid Credentials!'
                });
            }
        });
    }
    
    
}