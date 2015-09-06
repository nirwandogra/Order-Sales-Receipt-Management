var sess = require('../../session');
var doquery = require('model').doquery;
var model = require('model');
var conn_mongo = require('model').conn_mongo;

var calldoquery = function(query, res) {
  doquery(query, function(err, rows) {
    if (err) {
      res.send(false);
      return;
    }
    res.send(rows);
  });
};
var transaction = {
  getall: function(req, res) {
    var query;
    var user_id = req.query.user_id;
    if (!user_id) {
      query = "select * from transaction ";
    } else {
      query = "select * from transaction where user_id = " + user_id;
    }
    var options = {};
    if(user_id) {
      options.user_id  = user_id ;
    }
    var table = conn_mongo.transactions;
    table.find(options, function(err, rows) {
      if (err) {
        res.send(false);
        return;
      }
      res.send(rows);
    });
    //calldoquery(query, res);
  },
  getsome: function(req, res) {
    var page = req.query.page;
    var query = "select * from transaction limit " + page;
    var table = conn_mongo.transactions;
    table.find(options, function(err, rows) {
      if (err) {
        res.send(false);
        return;
      }
      res.send(rows);
    });
    //calldoquery(query, res);
  },
  addtransaction: function(req, res) {
    var transaction_data = req.body;
    var user_id = req.session.user;
    var description = transaction_data.description;
    var date = new Date();
    var category_id = transaction_data.category_id;
    var amount = transaction_data.amount;
    var image_url = transaction_data.image_url;

    var query = "insert into transaction (user_id,description,date,category_id,amount,image_url) values(" + user_id + " , '" + description + "','" + date + "'," + category_id + "," + amount + ",'" + image_url + "')";
    console.log(query);
    transaction_data.user_id = user_id;
    transaction_data.date = date;
    transaction_data.image_url = 'testing.jpg' ;
    //db.forum.insert(transaction_data) 
    var table = conn_mongo.transactions;
    var transaction =new table(transaction_data);
    transaction.save(function(err, rows) {
      console.log('saved now ',rows);
      console.log(err);
      if (err) {
        res.send(false);
        return;
      }
      res.send(rows);
    });
    //calldoquery(query, res);
  },
  deletetransaction: function(req, res) {
    /*
    remove a transaction
     * */
    var id = req.body.id;

    var query = "delete from transaction where id  = " + id;
    //calldoquery(query, res);
  },
  getimage: function(req, res) {
    var path = req.params.path;
    if (path) {
      res.json();
      return;
    }
    res.json('done');
    return;
  }
};
module.exports = function(app) {
  app.get('/gettransactions', sess.check_login, function(req, res) {
    transaction.getall(req, res);
  });
  app.get('/gettransactions_limit', sess.check_login, function(req, res) {
    transaction.getsome(req, res);
  });
  app.get('/image', sess.check_login, function(req, res) {
    transaction.getimage(req, res);
  });
  app.post('/transaction/delete', sess.check_login, function(req, res) {
    transaction.deletetransaction(req, res);
  });
  app.post('/transaction/add', sess.check_login, function(req, res) {
    transaction.addtransaction(req, res);
  });
};