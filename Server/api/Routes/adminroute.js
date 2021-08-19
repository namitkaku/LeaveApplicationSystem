'use strict';
module.exports = function(express)
{
    var router = express.Router();
    var AdminController = require('../Controllers/AdminController');
    router.post('/admin-login',AdminController.adminLogin)
    return router;
}