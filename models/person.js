let mongoose = require('mongoose');

let personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  favoriteFoods: [String]
});

module.exports = mongoose.model('Person', personSchema);