// MODELS
const petsRouter = require('express').Router();
const Pet = require('../models/pet');

// PET ROUTES

  // INDEX PET => index.js

  // NEW PET
petsRouter.get('/pets/new', (req, res) => {
  res.render('pets-new');
});

// CREATE PET
petsRouter.post('/pets', (req, res) => {
  var pet = new Pet(req.body);
  pet.save()
    .then((pet) => {
      res.send({ pet: pet });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send(err);
    }) ;
});

  // EDIT PET
petsRouter.get('/pets/:id/edit', (req, res) => {
  Pet.findById(req.params.id).exec((err, pet) => {
    res.render('pets-edit', { pet: pet });
  });
});

petsRouter.route('/pets/:id')
  // SHOW PET
.get((req, res) => {
  Pet.findById(req.params.id).exec((err, pet) => {
    res.render('pets-show', {
      pet: pet
    });
  });
})
// UPDATE PET
.put((req, res) => {
  Pet.findByIdAndUpdate(req.params.id, req.body)
    .then((pet) => {
      res.redirect(`/pets/${pet._id}`)
    })
    .catch((err) => {
      // Handle Errors
    });
})

// DELETE PET
.delete((req, res) => {
  Pet.findByIdAndRemove(req.params.id).exec((err, pet) => {
    return res.redirect('/')
  });
});


  module.exports = petsRouter