const mongoose = require("mongoose");

module.exports = () => {
    return mongoose.connect("mongodb+srv://tarun:tarun_123@cluster0.z5hzh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");
};

// mongodb+srv://tarun:<password>@cluster0.z5hzh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority