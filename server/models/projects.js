var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Project = new Schema({
      name: String,
      type: String,
      url: String
  });

//pull info from .env file
mongoose.connect(process.env.MONGO_URI); //|| 'mongodb://localhost/...'

module.exports = mongoose.model("projects", Project)
