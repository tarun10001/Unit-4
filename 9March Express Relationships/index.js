const express = require("express");
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

//Connect Database
const connect = () => {
    mongoose.connect("mongodb://127.0.0.1:27017/books")
}


// Section Schema
// Step 1: Creating the schema
const sectionSchema = new mongoose.Schema(
    {
        sectionName: {
            type: String,
            require: true
        }
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

// Step 2 :- Creating the model
const Section = mongoose.model("section", sectionSchema);

//Crud 

//get
app.get("/sections", async (req, res) => {
    try {
        const sections = await Section.find({}).lean().exec()
        return res.status(200).send({ Sections: sections });
    } catch (error) {
        console.log(error);
        return res.status(500).send("Please Check Your Network!");
    }
});

//Post
app.post("/sections", async (req, res) => {
    try {
        const section = await Section.create(req.body);
        return res.status(201).send(section);
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: error });
    }
});



// Books Schema

// Step 1: Creating the schema
const bookSchema = new mongoose.Schema(
    {
        bookName: { type: String, require: true },
        bookBody: { type: String, require: true },
        section_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "section",
            required: true
        },
        author_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "author",
            required: true
        },
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

// Step 2: Creating the model
const Book = mongoose.model("book", bookSchema)

// CRUD

//Get
app.get("/books", async (req, res) => {
    try {
        const books = await Book.find({}).lean().exec()
        return res.status(200).send({ Books: books });
    } catch (error) {
        console.log(error);
        return res.status(500).send("Please Check Your Network!");
    }
});

//Post
app.post("/books", async (req, res) => {
    try {
        const book = await Book.create(req.body);
        return res.status(201).send(book);
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: error });
    }
});



// Author Schema

// Step 1: Creating the schema
const authorSchema = new mongoose.Schema(
    {
        first_name: {
            type: String,
            require: true
        },
        last_name: {
            type: String,
            require: true
        }
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

// Step 2: Creating the model
const Author = mongoose.model("author", authorSchema)

// CRUD 

// Get
app.get("/author", async (req, res) => {
    try {
        const authors = await Author.find({}).lean().exec()
        return res.status(200).send({ Authors: authors });
    } catch (error) {
        console.log(err);
        return res.status(500).send("Please Check Your Network!");
    }
});

//post
app.post("/author", async (req, res) => {
    try {
        const author = await Author.create(req.body);
        return res.status(201).send(author);
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: error });
    }
});



// write api endpoints

//find all books written by an author
app.get("/:authorId/books", async (req, res) => {
    try {
        const books = await Book.find({ author_id: req.params.authorId }).lean().exec();
        return res.status(200).send(books);
    } catch (error) {
        return res.status(500).send({ error: error })
    }
})

// find books in a section
app.get("/books/:sectionId", async (req, res) => {
    try {
        const books = await Book.find({ section_id: req.params.sectionId }).lean().exec();
        return res.status(200).send(books);
    } catch (error) {
        return res.status(500).send({ error: error });
    }
});


app.listen(3000, async () => {
    try {
        await connect()
        console.log("Connection Established")
        console.log("Listening to port 5000");
    } catch (error) {
        console.log("Please check spelling");
    }
})