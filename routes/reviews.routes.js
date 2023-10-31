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

<<<<<<< HEAD

// Post to create a review
=======
// Post to create a new review
>>>>>>> 32609c0940b29a45b465373f825ce3c101c583a7
router.post('/', isAuthenticated, async (req, res) => {
  try {
    const newReview = await Review.create({...req.body, user: req.payload.userId})
    const fullNewReview = await Review.findById(newReview._id).populate('user')
    res.status(201).json({ review: fullNewReview})
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: 'Failed to create a review' });
  }
});

// Update a review by ID to add isAuthenticated, 
router.put('/:id', isAuthenticated, async (req, res) => {
<<<<<<< HEAD
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
=======
  
    try {
      const oneReview = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true })
      const fullOneReview = await Review.findById(oneReview._id).populate('user')
      res.status(202).json({ review: fullOneReview })
    } catch (error) {
      console.log(error)
      res.status(400).json({ error: 'Failed to update the review' })
>>>>>>> 32609c0940b29a45b465373f825ce3c101c583a7
    }

    if (review.user.toString() !== req.payload.userId) {
      return res.status(403).json({ error: 'You can only update your own reviews' });
    }

    const updatedReview = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ review: updatedReview });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: 'Failed to update the review' });
  }
});
// Delete a review by ID

router.delete('/:bookId/reviews/:id', isAuthenticated, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }

    if (review.user.toString() !== req.payload.userId) {
      return res.status(403).json({ error: 'You can only delete your own reviews' });
    }

    await Review.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: 'Failed to delete the review' });
  }
});

module.exports = router;
