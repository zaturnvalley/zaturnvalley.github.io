var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  title: String,
  description: String,
  user: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
});

var Job = mongoose.model('Job', schema);

module.exports = Job;
