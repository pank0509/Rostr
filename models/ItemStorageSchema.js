const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ItemStorageSchema = new Schema({
  itemname: {
    type: String,
    required: true,
  },
  itemoriginalprice: {
    type: Number,
    required: true,
  },
  gstonitem: {
    type: Number,
    required: true,
  },
  priceaftergst: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: String,
    required: true,
  }
});
module.exports = mongoose.model('itemstorage', ItemStorageSchema);