const express = require('express');
const app = express();
let data = [
    {
        book : "The Girl With the Dragon Tattoo",
        author : "Stieg Larsson",
        genre : "Fictional",
    },
    {
        book : "To Kill a Mockingbird",
        author : "Harper Lee",
        genre : "Fantasy",
    },
    {
        book : "The Lovely Bones",
        author : "Alice Sebold",
        genre : "Mystery",
    }
];

app.listen(4000, () => {
    console.log("Listening on port 4000");
})

app.get("/", (req, res) => {
    res.send("Hello");
});

app.get("/books",(req, res) => {
    res.send(data);
})