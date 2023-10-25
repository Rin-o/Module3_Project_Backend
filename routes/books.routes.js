const router = require('express').Router()
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { isAuthenticated } = require('../middlewares/routeGuard.middleware')
const Book = require("../models/Book.model")
const Author = require("../models/Author.model")


/* GET  all books page */
/*router.get('/books', isAuthenticated, async (req, res) => {
  try {
    const responseFromAPI = await fetch('http://localhost:5005/books')
    if (responseFromAPI.ok) {
      const booksFromAPI = await responseFromAPI.json()
      res.json({ books: booksFromAPI })
    }
  } catch (error) {
    console.error(error)
  }
})*/

router.get("/", (req, res, next) => {
  
  Book.find() .populate('authorId')
    .then((booksFromAPI) => {
      console.log(booksFromAPI);
      res.json(booksFromAPI);
    })
    .catch((error) => {
console.log({error})
    });
});

/* GET  a specific book page (detail)*/
router.get('/:id', async (req, res) => {
  try {
    const responseFromAPI = await fetch(
      `http://localhost:5005/books/${req.params.id}`
    )
    if (responseFromAPI.ok) {
      const bookFromAPI = await responseFromAPI.json()
      res.json({ book: bookFromAPI })
    }
  } catch (error) {
    console.error(error)
  }
})


module.exports = router
