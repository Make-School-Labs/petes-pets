const express = require('express');
const router = express.Router({mergeParams: true});
const model = require('../db/models/');
let comments = require('../json/comments')

// CREATE
router.post('/', (req, res) => {
    comments.unshift(req.body);

    res.redirect(`/pets/${req.params.petId}`);
});

router.delete('/:index', (req, res) => {
    model.Comment.destroy({
        where: {
            id: req.params.index
        }
    });
    res.redirect(`/pets/${req.params.petId}`);
});

router.get('/comment-populate', (req, res) => {
    const Pet = model.Pet;
    const Comment = model.Comment;

    Comment.sync().then(function(){
        // Just add ALL of the comments, man.
        commentJSON.forEach(function(content){
            content.PetId = req.params.petId;
            comment.create(content);
        });
    }).then(() => {
        res.send("Population successful.");
    }).catch((err) => {
        res.send(err);
    });

});

module.exports = router;
