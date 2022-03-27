const User = require("../models/user.model");

const express = require("express")

const router = express.Router();

router.get("", async(req,res) => {
    try{
        const users = await User.find({}).lean().exec();
        return res.send(users);
    } catch(err) {
        return res.send(err);
    }
})

module.exports = router;