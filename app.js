var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var basicAuth = require('express-basic-auth');
var jwt = require('express-jwt');
var rsaValidation = require('auth0-api-jwt-rsa-validation');


app.use(bodyParser.json());
app.use(basicAuth({
  users: {'admin': 'superse'}
}));


StoreItem = require('./models/account');

mongoose.connect('mongodb://localhost/account');
var db = mongoose.connection

app.get('/', function(req, res){
  res.send("Hello World");
});

app.get('/api/accounts', function(req, res){
  StoreItem.getStoreItems(function(err, accounts){
    if (err) {
      throw err;
    }
    res.json(accounts);
  });
});

app.get('/api/accounts/:_id', function(req, res){
  StoreItem.getStoreItemById(req.params._id, function(err, storeitem){
    if (err) {
      throw err;
    }
    res.json(storeitem);
  });
});

app.post('/api/accounts', function(req, res){
  var storeitem = req.body;
  StoreItem.addStoreItem(storeitem, function(err, storeitem){
    if (err) {
      throw err;
    }
    res.json(storeitem);
  });
});

app.put('/api/accounts/:_id', function(req, res){
  var id = req.params._id;
  var storeitem = req.body;
  StoreItem.updateStoreItem(id, storeitem, {}, function(err, storeitem){
    if (err) {
      throw err;
    }
    res.json(storeitem);
  });
});

app.delete('/api/accounts/:_id', function(req, res){
  var id = req.params._id;
  StoreItem.deleteStoreItem(id, function(err, storeitem){
    if (err) {
      throw err;
    }
    res.json(storeitem);
  });
});


app.listen(80);
console.log("Running on port 80");
