const books = require("./books.json")
const Book = require("./models/Book.model")
const Author = require("./models/Author.model")
const authors = require("./authors.json")

const MONGO_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/BookLovers";

  const mongoose = require("mongoose")

  const seeddb = async () => {
    try {
    await mongoose.connect (MONGO_URI)
    const newItems = await Book.insertMany(books.books)
    //const newAuthors = await Author.insertMany(authors.authors)
    // console.log(newItems)
    } catch (error) {
      console.log(error)
    }
  }

  seeddb()