const mongoose = require('mongoose');

//connect to mongodb

const connect = () => {
    mongoose.connect('mongodb+srv://tarun:tarun_123@cluster0.z5hzh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
};

module.exports = connect;