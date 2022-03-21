const express = require('express');
const router = express.Router();


const Book = require('../models/book.model');

const upload = require('../middlewares/upload');


router.post('/',upload.single('cover'),async (req, res) => {
    try{
        const book = await Book.create({
            likes : req.body.likes,
            coverImage : req.file.path,
            content : req.body.content,
            userId : req.body.userId,
            publicationId : req.body.publicationId
        });

        return res.status(200).send(book);
    }
    catch(err) {
        return res.status(400).send(err.message);
    }
});

module.exports = router;