const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './.env' })

mongoose.connect(process.env.MONGODB_CONNECTION_STRING)

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
  },
  last_visited: {
    type: Date,
    default: Date.now
  }
});

urlSchema.index({ long_url: 1 });
const URL = mongoose.model('URL', urlSchema);

module.exports = URL;
