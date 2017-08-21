var mongoose = require('mongoose');

var storeItemSchema = mongoose.Schema({
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

var storeItem = module.exports = mongoose.model('StoreItem', storeItemSchema);

//Get storeitems
module.exports.getStoreItems = function(callback, limit){
  storeItem.find(callback).limit(limit);
}

//Get storeitem by id
module.exports.getStoreItemById = function(id, callback){
  storeItem.findById(id, callback);
}

//Add storeitem
module.exports.addStoreItem = function(storeitem, callback){
  storeItem.create(storeitem, callback);
}

//Update storeitem
module.exports.updateStoreItem = function(id, storeitem, options, callback){
  var query = {_id: id};
  var update = {
    name: storeitem.name,
    price: storeitem.price
  }
  storeItem.findOneAndUpdate(query, update, options, callback);
}

//Delete storeitem
module.exports.deleteStoreItem = function(id, callback){
  var query = {_id: id};
  storeItem.remove(query, callback);
}
