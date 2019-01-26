const indexRoute = require('express').Router();
const Pet = require('../models/pet');

/* GET home page. */
indexRoute.get('/', (req, res) => {
  Pet.find()
  .then((pets) => {
    res.render('pets-index', { pets });
  })
  .catch((err) => { res.send(err) });
});


module.exports = indexRoute