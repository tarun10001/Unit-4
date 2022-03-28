const express = require('express');
const router = express.Router();

const User = require("../models/user.model");
constTodo = require("../models/todo.model");

router.get("", authenticate, async (req, res) => {
    req.body.userId = req.user._id;
    try {
        const todos = await Todo.find({userId : req.body.userId}).lean().exec();
        return res.status(200).send({Todo: todos});
    }
    catch (err) {
        return res.status(500).send({message: err.message});
    }
})

// Create Todo 
router.post("", authenticate, async (req, res) => {
    req.body.userId = req.user._id;
    console.log(req.user);

    try {
        const todo = await Todo.create(req.body);
        return res.status(200).send({message : 'Todo successfully created', Todo: todo});
    }
    catch (err) {
        return res.status(500).send({message: err.message});
    }
})

//Todo _id
router.get("", authenticate, async(req, res) => {
    try {
        const todos = await Todo.findById(req.params.id);
        return res.status(200).send({Todo: todos});
    }
    catch(err) {
        return res.status(401).send({message: "You are not logged in"});
    }
});

//Patch todos 
router.patch("/:id", authenticate, async(req, res) => {
    req.body.userId = req.user._id;
    try {
        const todo = await Todo.findByIdAndUpdate(req.params.id, req.body,{new:true});
        return res.status(200).send({message:"Todo updated", Todo:todo});
    }
    catch(err) {
        return res.status(401).send({message: "You are not logged in"});
    }
});

//Delete a Todo
router.delete("/:id", authenticate, async(req, res) => {
    req.body.userId = req.user._id;
    try {
        const todo = await Todo.findByIdAndDelete(req.params.id);
        return res.status(200).send({message:"Todo deleted", Todo:todo});
    }
    catch(err) {
        return res.status(401).send({message: "You are not logged in"});
    }
});


module.exports = router;