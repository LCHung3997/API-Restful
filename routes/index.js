var express = require('express');
var router = express.Router();
var db = require('../model/index.model')
 
/* GET home page. */
router.get('/', function(req, res, next) {
  db.load().then((r) => {
    res.json(r);
    //res.render('index', { title: 'Express' });
  })
});

router.post('/user/register',function(req, res, next){
  let account = {
    Username:  req.body.Username,
    Password: req.body.Password
  }
  db.addAccount(account).then((acc) => {
    res.status('200').json({status : '200', Username:  req.body.Username,
    Password: req.body.Password})
  });
})

module.exports = router;
