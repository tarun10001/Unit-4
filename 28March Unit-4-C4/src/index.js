const express = require('express');
const app = express();
app.use(express.json());

const {registerUser,loginUser} = require('./controllers/auth.controller');
const todoController = require('./controllers/todo.controller');

app.post('/register', registerUser);
app.post('/login', loginUser);

app.use('/todos',todoController);

module.exports = app;