var mongoose = require('mongoose');

var accountSchema = mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  price:{
    type: String,
    required: true
  },
  create_date:{
    type: Date,
    defalut: Date.now
  }
});

var account = module.exports = mongoose.model('Account', accountSchema);

//Get accounts
module.exports.getAccounts = function(callback, limit){
  account.find(callback).limit(limit);
}

//Get account by id
module.exports.getAccountById = function(id, callback){
  account.findById(id, callback);
}

//Add account
module.exports.addAccount = function(account, callback){
  account.create(account, callback);
}

//Update account
module.exports.updateAccount = function(id, account, options, callback){
  var query = {_id: id};
  var update = {
    name: account.name,
    price: account.price
  }
  account.findOneAndUpdate(query, update, options, callback);
}

//Delete account
module.exports.deleteAccount = function(id, callback){
  var query = {_id: id};
  account.remove(query, callback);
}
