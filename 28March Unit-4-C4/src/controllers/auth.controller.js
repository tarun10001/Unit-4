const User = require('../models/user.model');
var jwt = require('jsonwebtoken');

//generating bearer token for user
function generateToken(user) {
    var token = jwt.sign({user}, 'secretkey');
    return token;
}


//registering new user
const registerUser = async(req, res) => {
    try{
        let user = await User.findOne({email : req.body.email}).lean().exec();

        if(user) {
            return res.status(400).send({message: 'User already registered'});
        }
        else{
            user = await User.create(req.body);
            const token = generateToken(user);
            return res.status(201).send({message: 'User registered',user: user,token: token});
        }
    }
    catch(err){
        return res.status(400).send({message: err.message});
    }
}

//logging in an existing user
const loginUser = async(req, res) => {
    try{
        const user = await User.findOne({email : req.body.email});

        if(!user)
            return res.status(400).send({message: 'User not found'});
        
        let match;

        if(user.password === req.body.password)
            match = true;
        
        if(!match)
            return res.status(400).send({message: 'Invalid Credentials'});
        
        const token = generateToken(user);
        return res.status(200).send({message: 'Logged in Successfully',user: user,token: token});

    }
    catch(err) {
        return res.status(400).send({message: err.message});
    }
}

module.exports = {registerUser,loginUser};