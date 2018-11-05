const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const DistrictSchema = new Schema({
  districtname: {
    type: String,
  },
  did: {
    type: String,
  }
});
module.exports = mongoose.model('districtschema', DistrictSchema);