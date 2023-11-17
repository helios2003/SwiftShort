const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
  long_url: {
    type: String,
    required: true,
    maxlength: 1023
  },
  short_url: {
    type: String,
    required: true,
    maxlength: 255
  }
});

const URL = mongoose.model('URL', urlSchema);

module.exports = URL;
