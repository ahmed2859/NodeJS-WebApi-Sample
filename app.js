var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var basicAuth = require('express-basic-auth');
var jwt = require('express-jwt');
var rsaValidation = require('auth0-api-jwt-rsa-validation');


// app.use(bodyParser.json());
// app.use(basicAuth({
//   users: {'admin': 'superse'}
// }));


Account = require('./models/account');

mongoose.connect('mongodb://localhost/account');
var db = mongoose.connection

app.get('/', function(req, res){
  res.send("Hello World");
});

app.get('/api/accounts', function(req, res){
  Account.getAccounts(function(err, accounts){
    if (err) {
      throw err;
    }
    res.json(accounts);
  });
});

app.get('/api/accounts/:_id', function(req, res){
  Account.getAccountById(req.params._id, function(err, accounts){
    if (err) {
      throw err;
    }
    res.json(accounts);
  });
});

app.post('/api/accounts', function(req, res){
  var account = req.body;
  Account.addAccount(account, function(err, account){
    if (err) {
      throw err;
    }
    res.json(account);
  });
});

app.put('/api/accounts/:_id', function(req, res){
  var id = req.params._id;
  var account = req.body;
  Account.updateAccount(id, account, {}, function(err, account){
    if (err) {
      throw err;
    }
    res.json(account);
  });
});

app.delete('/api/accounts/:_id', function(req, res){
  var id = req.params._id;
  Account.deleteAccount(id, function(err, account){
    if (err) {
      throw err;
    }
    res.json(account);
  });
});


app.listen(80);
console.log("Running on port 80");
