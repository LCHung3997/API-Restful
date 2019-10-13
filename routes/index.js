var express = require('express');
var router = express.Router();
var db = require('../model/index.model')
const passport  = require('passport');
 
/* GET home page. */
router.get('/', function(req, res, next) {
 
    res.render('index', { title: 'Express' });
  
});

router.get('/me',passport.authenticate('jwt', {session: false}),function(req, res, next) {
  res.json(req.user);
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
