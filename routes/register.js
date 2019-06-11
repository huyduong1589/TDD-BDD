var express = require('express');
var router = express.Router();
var user = require('../models/user_tbl');

router.get('/', function(req, res, next){
  res.render('register')
})

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
    user.register(email, pass).then( function(data){
        message = data.message;
        res.send({"message":message});
        res.end();
      }

    )

  }
});

router.delete('/', async function(req, res, next) {
  var email = req.body.email;
  var message;
  console.log("EMAIL --- " + email);
  if (typeof(email) == 'undefined'){
    res.send({"message":"missing parameter"});
    res.end();
  }
  else {
    message = "register successfully"
    res.send({"message":message});
    res.end();
  }
});

module.exports = router;
