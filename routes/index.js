var express = require("express");
var router = express.Router();
var db = require("../model/index.model");
const passport = require("passport");

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/me", passport.authenticate("jwt", { session: false }), function(
  req,
  res,
  next
) {
  res.json(req.user);
});

router.post("/user/register", function(req, res, next) {
  let account = {
    gmail: req.body.gmail,
    Password: req.body.Password,
    Username: req.body.Username,
    gender: req.body.gender,
    avatar: req.body.avatar,
  };
  db.getGmail(account.gmail).then(sum => {
    var a = sum[0]
    if (sum.length === 0) {
      db.addAccount(account).then(acc => {
        res
          .status("200")
          .json({
            status: "200",
            gmail: req.body.gmail,
            Password: req.body.Password
          });
      });
    }
    else{
      res
      .status("400")
      .json({
        status: "400",
        confirm: 'Tài khoản đã tồn tại'
      });
    }
  });
});

module.exports = router;
