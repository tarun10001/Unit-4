const express = require('express');
const router = express.Router();

const Comment = require('../models/comment.model');

//Create a comment
router.post('/', async (req, res) => {
    try{
        const comment = await comment.create(req.body);
        return res.status(200).send(comment);
    }
    catch(err){
        return res.status(500).send(err.message);
    }
});


router.get('/', async (req, res) => {
    try{
        const page = req.query.page || 1;
        const pagesize = req.query.pagesize || 10;
        const skip = (page - 1) * pagesize;

        const comments = await Comment.find().skip(skip).limit(pagesize).lean().exec();
        return res.status(200).send(comments);
    }
    catch(err){
        return res.status(500).send(err.message);
    }
})

module.exports = router;