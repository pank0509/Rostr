const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const StateSchema = new Schema({
  statename: {
    type: String,
  },
  sid: {
    type: String,
  }
});
module.exports = mongoose.model('stateschema', StateSchema);