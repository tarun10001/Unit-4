const User = require('..model/user.model');


const registerUser = async (req, res) => {
    try {
        let user = await User.findOne({email: req.body.email});
        if (user)
        return res.status(400).send({message: 'User already exists'});

        user = await User.create(req.body);
        return res.status(200).send(user);
    }
    catch(err) {
        return res.status(400).send({message: err.message});
    }
};

const loginUser = async (req, res) => {
    try{
        let user = await User.findOne({email : req.body.email});

        if(!user)
            return res.status(400).send({message: 'User not found!'});
        
        if(req.body.password != user.password)
            return res.status(400).send({message :"Invalid Credentials"});
        else
            return res.status(200).send({message :"Logged In Successfully", user});
    }
    catch(err)
    {
        return res.status(400).send({message: err.message});
    }
}

module.exports = {registerUser,loginUser};