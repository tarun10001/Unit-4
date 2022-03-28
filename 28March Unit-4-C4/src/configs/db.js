const mongoose = require('mongoose');

modules.export = () => {
    return mongoose.connect("mongodb+srv://tarun:tarun_123@cluster0.z5hzh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
}