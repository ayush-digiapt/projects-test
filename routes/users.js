var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  var all_users = [1,2,3];
  var users = [
    {name:"Ayush"},
    {name:"Ranjith"}
  ];
  var admins = [
    {name:"Mahesh"},
    {name:"Rupam"}
  ];
  all_users.users=[];
  all_users.admins=[];
  all_users.push(users);
  res.status(200).send(all_users);
});

module.exports = router;
