const express = require('express');
const router = express.Router({mergeParams: true});
const model = require('../db/models/');
let comments = require('../json/comments')

// CREATE
router.post('/', (req, res) => {
    comments.unshift(req.body);

    res.redirect(`/pets/${req.params.petId}`);
});

// DESTROY
router.delete('/:index', (req, res) => {
    console.log(req.params.index);
    model.Comment.destroy({
        where: {
            id: req.params.index
        }
    });
    res.redirect(`/pets/${req.params.petId}`);
});



module.exports = router;
