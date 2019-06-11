var express = require('express');
var router = express.Router();
var user = require('../models/user_tbl');

router.post('/', async function(req, res, next) {
  var email = req.body.email;
  var pass = req.body.pass;
  var message;
  console.log("EMAIL --- " + email);
  console.log("PASS  ---" + pass);
  if (typeof(email) == 'undefined' || typeof(pass) == 'undefined'){
    res.send({"message":"missing parameter"});
    res.end();
  }
  else {
    await user.check(email,pass).then(function (data) {
      message = data.message;
      if (message == 'valid login'){
        console.log("DUNG PASS ROI, CHO NO QUA")
        res.render('home');
        res.end();
      }
      else {
        res.redirect('/');
        res.end();
      }
    })
  }
});

module.exports = router;
