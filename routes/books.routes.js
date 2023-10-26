const router = require('express').Router()
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { isAuthenticated } = require('../middlewares/routeGuard.middleware')
const Book = require("../models/Book.model")
const Author = require("../models/Author.model")


/* GET  all books page */

router.get("/", (req, res, next) => {
  
  Book.find().populate('authorId')
    .then((booksFromAPI) => {
      console.log(booksFromAPI);
      res.json(booksFromAPI);
    })
    .catch((error) => {
console.log({error})
    });
});

/* GET  a specific book page (detail)*/

router.get('/:bookId', async (req, res) => {
  const { bookId } = req.params
  if (mongoose.isValidObjectId(bookId)) {
    try {
      const currentBook = await Book.findById(bookId).populate('authorId')
      if (currentBook) {
        console.log(currentBook)
        res.json({ book: currentBook })
      } else {
        res.status(404).json({ message: 'Book not found' })
      }
    } catch (error) {
      console.log(error)
      res.status(400).json({ error })
    }
  } else {
    res.status(400).json({ message: 'The id seems wrong' })
  }
})

module.exports = router
