const express = require('express');
const router = express.Router();
const Review = require('../models/Review.model'); 
const User = require('../models/User.model')
const { isAuthenticated } = require('../middlewares/routeGuard.middleware')


/* GET  all reviews*/

router.get('/:bookId/reviews', isAuthenticated, async (req, res) => {
  try {
    const { bookId } = req.params
    const reviews = await Review.find({ book : bookId}).populate('user')
    res.status(200).json(reviews);
  } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Status code: 500 (Internal Server Error)" });

  }
});

// Post to create a new review
router.post('/', isAuthenticated, async (req, res) => {
  try {
    const newReview = await Review.create({...req.body, user: req.payload.userId})

    res.status(201).json({ review: newReview})
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: 'Failed to create a review' });
  }
});

// Update a review by ID
router.put('/:id', isAuthenticated, async (req, res) => {
  
    try {
      const newReview = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true })
      res.status(202).json({ review: newReview })
    } catch (error) {
      console.log(error)
      res.status(400).json({ error: 'Failed to update the review' })
    }
});

// Delete a review by ID

router.delete('/:bookId/reviews/:id', isAuthenticated, async (req, res) => {
    await Review.findByIdAndDelete(req.params.id)
    res.status(202).json({ message: 'Review deleted' })
  })

module.exports = router;
