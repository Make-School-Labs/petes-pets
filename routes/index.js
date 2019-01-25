const indexRoute = require('express').Router();
const Pet = require('../models/pet');

/* GET home page. */
indexRoute.get('/', (req, res) => {
  Pet.find().exec((err, pets) => {
    res.render('pets-index', { pets: pets });    
  });
});


module.exports = indexRoute