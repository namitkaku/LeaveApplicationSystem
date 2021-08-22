'use strict';

var mongoose = require('mongoose');
var Admin = mongoose.model('Admin');
var User = mongoose.model('User');
const nodemailer = require('nodemailer');


module.exports = {
    adminLogin:adminLogin,
    createUser:createUser,
    getAllUsers:getAllUsers,
    deactivateUser:deactivateUser,
    activateUser:activateUser,
    getUserData:getUserData,
    updateUserInfo:updateUserInfo,
    deleteUser:deleteUser,
    sendCredentials:sendCredentials,
    changePassword:changePassword
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

function createUser(req,res)
{
    if(req.body.email == "")
    {
        return res.json({
            'status':300,
            'message': 'Please enter email'
        });
    }
    else 
    {
        User.countDocuments({email:req.body.email}).then(count => {
            if(count > 0)
            {
                return res.json({
                    'status':300,
                    'message': `${req.body.email} already exists. Please try with other email`
                });
            }
            else
            {
                var userData = {
                    name:req.body.name,
                    email:req.body.email,
                    phone:req.body.phone,
                    password:req.body.password,
                    gender:req.body.gender,
                    department:req.body.department,
                    address:req.body.address,
                    description:req.body.description,
                    Status:1
                }
                
                User.insertMany(userData).then(save => {
                    if(save)
                    {
                      return res.json({
                          'status': 200,
                          'message' : `User with name  ${req.body.name}  added Successfully!`,
                      })
                    }
                    else
                    {
                      return res.json({
                          'status': 300,
                          'message' : 'Fail to add User',
                      })
                    }
                })
            }
        })
    }
}

function getAllUsers(req,res)
{
    User.find().then(data => {
        if(data)
        {
            return res.json({
                'status': 200,
                'message' : 'Records Fetch Successfully!',
                'data' : data
            })
        }
        else
        {
            return res.json({
                'status': 300,
                'message' : 'No Records Found',
            })
        }
    })
}

function deactivateUser(req,res)
{
  User.find({_id:req.params.id}).then(data => {
      if(data)
      {
        User.updateOne(
            {_id:req.params.id},
            {$set:{Status:0}}).then(update => {
                if(update)
                {
                   return res.json({
                       'status' :200,
                       'message': 'Deactivated Successfully!'
                   });
                }
                else
                {
                   return res.json({
                       'status' :300,
                       'message': 'Fail to deactivate'
                   });
                }
            })
      }
      else
      {
        return res.json({
            'status' :300,
            'message': 'Record not found'
        });
      }
  })
}

function activateUser(req,res)
{
  User.find({_id:req.params.id}).then(data => {
      if(data)
      {
        User.updateOne(
            {_id:req.params.id},
            {$set:{Status:1}}).then(update => {
                if(update)
                {
                   return res.json({
                       'status' :200,
                       'message': 'Activated Successfully!'
                   });
                }
                else
                {
                   return res.json({
                       'status' :300,
                       'message': 'Fail to Activate'
                   });
                }
            })
      }
      else
      {
        return res.json({
            'status' :300,
            'message': 'Record not found'
        });
      }
  })
}

function getUserData(req,res)
{
    User.find({_id:req.params.userid}).then(data => {
        if(data)
        {
            return res.json({
                'status' :200,
                'message': 'Record found Successfully!',
                'data' : data
            });
        }
        else
        {
            return res.json({
                'status' :300,
                'message': 'User not Found'
            });
        }
    })
}

function updateUserInfo(req,res)
{
    User.updateOne(
        {_id:req.body._id},
        {$set:{name:req.body.name,email:req.body.email,
            phone:req.body.phone,gender:req.body.gender,
            department:req.body.department,
            address:req.body.address,description:req.body.description}},).then(update => {
            if(update)
            {
             return res.json({
                 'status' : 200,
                 'message' : 'Record Updated Successfully!'
             })
            }
            else
            {
             return res.json({
                 'status' : 300,
                 'message' : 'Fail to update Record!'
             })
            }
        }) 
}

function deleteUser(req,res)
{
    User.deleteOne({_id:req.params.id}).then(ifdelete =>{
        if(ifdelete)
        { 
            return res.json({
                'status' : 200,
                'message' : 'Record Deleted Successfully!'
            })
        }
        else
        {
            return res.json({
                'status' : 300,
                'message' : 'Fail to delete record!'
            })
        }
    })
}

function sendCredentials(req,res)
{
    User.countDocuments({email:req.params.email}).then(count => {
        if(count > 0)
        {
            User.find({email:req.params.email}).then(data => {
                if(data[0].Status == 1)
                {
                    var transport = nodemailer.createTransport({
                        service:'gmail',
                        auth:{
                            user:'namitsingh.lmp1994@gmail.com',
                            pass:'sheeltasingh'
                        }
                    });
                    var mailoptions = {
                      from:'namitsingh.lmp1994@gmail.com',
                      to:req.params.email,
                      subject:'Please find your Login Credentials',
                      text:
                      `Hello ${req.params.email},
Welcome to Leave Management portal you will use this portal to send
leave requests.
                
Your Credentials are:
Email: ${req.params.email}
Password: ${data[0].password}

Thanks and Regards
Namit Singh
Admin Leave Application Mangement Portal`  
                    };
                
                    transport.sendMail(mailoptions,function(error,info){
                        if(error)
                        {
                            return res.json({
                                'status' : 300,
                                'message' : `Fail to send Email`,
                            });
                            
                        }
                        else
                        {
                            return res.json({
                                'status' : 200,
                                'message' : `Credentials send Successfully to ${req.params.email}`,
                            });
                        }
                    })
                }
                else
                {
                    return res.json({
                        'status' : 300,
                        'message' : `Sorry User is Deactivate please activate first`,
                    });
                }
            })
        }
        else
        {
            return res.json({
                'status' : 300,
                'message' : `Invalid Email user not found`,
            });
        }
    }) 
}

function changePassword(req,res)
{
    if(req.body.current_password == null)
    {
        return res.json({
            'status':300,
            'message': 'Please enter Currrent Password'
        });
    }
    else if(req.body.new_password == null)
    {
        return res.json({
            'status':300,
            'message': 'Please enter New Password'
        });
    }
    else if(req.body.confirm_password == null)
    {
        return res.json({
            'status':300,
            'message': 'Please enter Confirm Password'
        });
    }
    else
    {
        Admin.countDocuments({email:req.body.email}).then(count => {
            if(count > 0)
            {
                Admin.find({email:req.body.email}).then(data => {
                    if(data)
                    {
                       if(req.body.current_password == data[0].password)
                       {
                           if(req.body.new_password == req.body.confirm_password)
                           {
                               Admin.updateOne(
                                   {email:req.body.email},
                                   {$set: {password:req.body.new_password}}).then(update => {
                                       if(update)
                                       {
                                        return res.json({
                                            'status' :200,
                                            'message' : 'Password has been Successfully Changed!'
                                        });
                                       }
                                       else
                                       {
                                        return res.json({
                                            'status' :300,
                                            'message' : 'Fail to Change the Password'
                                        });
                                       }
                                   })
                           }
                           else
                           {
                            return res.json({
                                'status' :300,
                                'message' : 'New Password and Confirm Password doesnot match'
                            });
                           }
                       }
                       else
                       {
                           return res.json({
                               'status' :300,
                               'message' : 'Please enter correct Current Password'
                           });
                       }   
                    }
                })
            }
            else
            {
                return res.json({
                    'status' :300,
                    'message' : 'Email not Found',
                    'data': req.body
                });
            }
        })
    }
    
}