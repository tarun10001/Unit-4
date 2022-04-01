const mongoose = require('mongoose');

// creating userSchema
const userSchema = new mongoose.Schema
(
    {
        first_name : {type : String, required: true},
        last_name : {type : String, required: true},
        email : {type : String, required: true, unique: true},
        pincode : {type : Number, required: true},
        age : {type : Number, required: true},
        gender : {
            type : String,
            enum : ["Male","Female","Others"]
        }
    },
    {
        versionKey : false,
        timestamps : true
    }
);

//creating user model

const User = mongoose.model('user',userSchema);

module.exports = User;