const express = require('express');
const router = express.Router();
const Review = require('../models/Review.model'); 

// Post to create a new review
router.post('/', async (req, res) => {
  try {
    const newReview = await Review.create(req.body)
    // .populate('User')
    res.status(201).json({ review: newReview})
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: 'Failed to create a review' });
  }
});

// Update a review by ID
router.put('/:id', async (req, res) => {
  
    try {
      const newReview = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true })
      res.status(202).json({ review: newReview })
    } catch (error) {
      console.log(error)
      res.status(400).json({ error: 'Failed to update the user' })
    }
});

// Delete a review by ID

router.delete('/:id', async (req, res) => {
    await Review.findByIdAndDelete(req.params.id)
    res.status(202).json({ message: 'Review deleted' })
  })

module.exports = router;
