"use strict";

const mongoose = require('mongoose'),
        Schema = mongoose.Schema;

const PetSchema = new Schema({
  name: { type: String, required: [true, 'Give that little guy a name!'] }, 
  species: { type: String, required: [true, 'Uh-oh forgot the species'] },
  picUrl: { type: String, required: [true, 'Needs a rectangular picture'] },
  picUrlSq: { type: String, required: [true, 'Needs a square picture'] },
  favoriteFood: { type: String, required: [true, 'What about a favorite food?'] },
  description: { type: String, min: [100, 'Pets find homes faster with a good description.'] }
}, {
  timestamps: true
});

module.exports = mongoose.model('Pet', PetSchema);
