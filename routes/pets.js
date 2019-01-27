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
  let pet = new Pet(req.body);
  pet.save()
    .then((pet) => {
      res.send({ pet });
    })
    .catch((err) => { res.status(400).send(err.errors) });
});

// EDIT PET
petsRouter.get('/pets/:id/edit', (req, res) => {
  Pet.findById(req.params.id)
  .then((pet) => {
    res.render('pets-edit', { pet });
  })
  .catch((err) => res.send(err));
});

petsRouter.route('/pets/:id')
  // SHOW PET
  .get((req, res) => {
    Pet.findById(req.params.id)
    .then((pet) => {
      res.render('pets-show', { pet });
    })
    .catch((err) => { res.send(err) });
  })
  // UPDATE PET
  .put((req, res) => {
    Pet.findByIdAndUpdate(req.params.id, req.body)
      .then((pet) => {
        res.redirect(`/pets/${pet._id}`)
      })
      .catch((err) => {res.send(err)});
  })
  // DELETE PET
  .delete((req, res) => {
    Pet.findByIdAndRemove(req.params.id)
    .then((pet) => {
      return res.redirect('/');
    })
    .catch((err) => res.send(err));
  });

// SEARCH PET
petsRouter.get('/search', (req, res) => {
  const page = req.query.page || 1;
  const term = new RegExp(req.query.term, 'i');

  Pet.paginate({ 
    $or: [
      {'name': term},
      {'species': term}
    ]
  })
  .then((results) => {
    res.render('pets-index', { 
      pets: results.docs,
      pagesCount: results.pages,
      currentPage: page,
      term: req.query.term
    });
  })
  .catch((err) => { res.json(err) });
});


  module.exports = petsRouter