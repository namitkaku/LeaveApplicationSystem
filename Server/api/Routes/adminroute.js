'use strict';
module.exports = function(express)
{
    var router = express.Router();
    var AdminController = require('../Controllers/AdminController');
    router.post('/admin-login',AdminController.adminLogin);
    router.post('/add-user',AdminController.createUser);
    router.get('/get-all-users',AdminController.getAllUsers);
    router.get('/deactivate-user/:id',AdminController.deactivateUser);
    router.get('/activate-user/:id',AdminController.activateUser);
    router.get('/get-user-data/:userid',AdminController.getUserData);
    router.post('/update-user-info/',AdminController.updateUserInfo);
    router.get('/delete-user/:id',AdminController.deleteUser);
    router.get('/send-credentials/:email',AdminController.sendCredentials);
    router.post('/change-password',AdminController.changePassword);
    return router;
}