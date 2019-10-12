var express = require('express');
var router = express.Router();
var db = require('../utils/connectDB')
 
/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('-----');
  db.load('select * from Account').then((r) => {
    console.log(r);
    res.render('index', { title: 'Express' });
  })
});


module.exports = router;
