const books = require("./books.json")
const Book = require("./models/Book.model")
const Author = require("./models/Author.model")
const authors = require("./authors.json")

const MONGO_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/BookLovers";

  const mongoose = require("mongoose")
  const book = 
  {
    title: "A Game of Thrones",
    authorId: "6537e7aaebd97d3b337bd41a",
    image: "https://upload.wikimedia.org/wikipedia/en/9/93/AGameOfThrones.jpg",
    publisher: "Bantam Spectra",
    publishingDate: "1996-08-01",
    description: "A Game of Thrones is a sprawling and complex fantasy novel that serves as the opening installment of George R.R. Martin's highly acclaimed \"A Song of Ice and Fire\" series. The story is set in the fictional continents of Westeros and Essos and is known for its intricate world-building, political intrigue, and richly developed characters. The novel follows multiple point-of-view characters, including members of noble houses, knights, and commoners, as they navigate the power struggles, rivalries, and conflicts for control of the Iron Throne of the Seven Kingdoms of Westeros.",
    categories: ["Fantasy"]
}
  const seeddb = async () => {
    try {
    await mongoose.connect (MONGO_URI)
    const newItems = await Book.insertMany(books.books)
    //const newAuthors = await Author.insertMany(authors.authors)
    // console.log(newItems)
    // const newBook = await Book.create(book)
    } catch (error) {
      console.log(error)
    }
  }

  seeddb()