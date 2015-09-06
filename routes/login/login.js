var paths = require('../../path');
var sess = require('../../session');
var bodyparser = require('body-parser');
var doquery = require('model').doquery;
var conn_mongo = require('model').conn_mongo;

module.exports = function(app) {
  app.get('/login', function(req, res) {
    res.sendFile(paths.login);
  });
  app.post(['/login', '/signin'], function(req, res) {
    var email = req.body.email;
    var pass = req.body.pass;
    var query = 'select id,password from user where username= "' + email + '";';
    /*
    	db.forum.find({username:email})
    */
    var table = conn_mongo.users;
    table.find({username:email}, function(err, rows) {
      console.log(rows);
      if (!err && rows[0] != undefined && rows[0].password == pass) {
        req.session.user = rows[0].id;
        req.session.email = email;
        console.log("seting session user =  ", req.session.user);
        console.log("seting session email =  ", req.session.email);
        res.redirect("/profile");
      } else {
        console.log(err);
        res.redirect("/login");
      }
    });
  });
  app.post('/logout', function(req, res) {
    req.session.reset();
    console.log("detroyed session");
    res.redirect('/login');
  });
};