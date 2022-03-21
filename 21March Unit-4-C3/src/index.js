const express = require('express');
const app = express();

const {registerUser,loginUser} = require('./controllers/auth.controller');
const userController = require('./controllers/user.controller');
const bookController = require('./controllers/book.controller');
const commentController = require('./controllers/comment.controller');


app.use(express.json());

app.post('/register', registerUser);
app.post('/login', loginUser);

app.use('/comments', commentController);
app.use('/books', bookController);

module.exports = app;