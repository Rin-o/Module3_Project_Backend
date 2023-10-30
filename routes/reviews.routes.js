const express = require('express');
const router = express.Router();
const Review = require('../models/Review.model');
const User = require('../models/User.model')
const { isAuthenticated } = require('../middlewares/routeGuard.middleware')


/* GET  all reviews*/

router.get('/:bookId/reviews', isAuthenticated, async (req, res) => {
  try {
    const { bookId } = req.params
    const reviews = await Review.find({ book: bookId }).populate('user')
    res.status(200).json(reviews);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Status code: 500 (Internal Server Error)" });

  }
});

// Post to create a new review
router.post('/', isAuthenticated, async (req, res) => {
  try {
    const newReview = await Review.create({ ...req.body, user: req.payload.userId })
    const fullNewReview = await Review.findById(newReview._id).populate('user')
    res.status(201).json({ review: fullNewReview })
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: 'Failed to create a review' });
  }
});

// Update a review by ID 
router.put('/:id', isAuthenticated, async (req, res) => {

  try {
    const review = await Review.findById(req.params.id); //added

    if (!review) { //added
      return res.status(404).json({ message: 'Review not found' }); //added
    }

    if (review.user.toString() !== req.user.id) { //added
      return res.status(403).json({ message: 'You are not authorized to update this review' }); //added
    }//added

    const oneReview = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true })
    const fullOneReview = await Review.findById(oneReview._id).populate('user')
    res.status(202).json({ review: fullOneReview })

  } catch (error) {
    console.log(error)
    res.status(400).json({ error: 'Failed to update the review' })
  }
});

// Delete a review by ID

router.delete('/:bookId/reviews/:id', isAuthenticated, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    if (review.user.toString() !== req.user._id) {
      return res.status(403).json({ message: 'You are not authorized to delete this review' });
    }

    await Review.findByIdAndDelete(req.params.id);
    res.status(202).json({ message: 'Review deleted' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to delete the review' });
  }
});

/*router.delete('/:bookId/reviews/:id', isAuthenticated, async (req, res) => {
    await Review.findByIdAndDelete(req.params.id)
    res.status(202).json({ message: 'Review deleted' })
  })

  router.use((req, res, next) => {
    res.status(404).send('404 - Page Not Found');
  });*/

module.exports = router;
