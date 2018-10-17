var express = require('express');
var router = express.Router();
var testController = require("../controllers/test");


//create users
router.post('/', testController.createUser);

//get users and admins details
router.get('/', testController.details);

module.exports = router;