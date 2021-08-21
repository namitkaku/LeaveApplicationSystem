'use strict';

var mongoose = require('mongoose');
var Admin = mongoose.model('Admin');
var User = mongoose.model('User');

module.exports = {
    adminLogin:adminLogin,
    createUser:createUser,
    getAllUsers:getAllUsers,
    deactivateUser:deactivateUser,
    activateUser:activateUser,
    getUserData:getUserData,
    updateUserInfo:updateUserInfo,
    deleteUser:deleteUser
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