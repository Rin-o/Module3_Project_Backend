const express = require('express');
const router = require('express').Router()
const User = require("../models/User.model")

const { isAuthenticated } = require('../middlewares/routeGuard.middleware');
const { default: mongoose } = require('mongoose');

/* GET  a specific user page (detail)*/

router.get('/data', isAuthenticated, async (req, res) => {
    const { userId } = req.payload
    if (mongoose.isValidObjectId(userId)) {
      try {
        const currentUser = await User.findById(userId)
        if (currentUser) {
          console.log(currentUser)
          res.json({ user: currentUser })
        } else {
          res.status(404).json({ message: 'User not found' })
        }
      } catch (error) {
        console.log(error)
        res.status(400).json({ error })
      }
    } else {
      res.status(400).json({ message: 'The id seems wrong' })
    }
  })

// POST to create a new user
router.post('/', async (req, res) => {
    try {
      const newUser = await User.create(req.body)
      res.status(201).json({ user: newUser })
    } catch (error) {
      console.log(error)
      res.status(400).json({ error: 'Failed to create a user' });
    }
  })

  // PUT to update an existing user
  router.put('/:userId', isAuthenticated, async (req, res) => {
    const { userId } = req.params
  
    try {
      const oneUser = await User.findByIdAndUpdate(userId, req.body, { new: true })
      res.status(202).json({ user: oneUser })
    } catch (error) {
      console.log(error)
      res.status(400).json({ error: 'Failed to update the user' })
    }
  })


  // DELETE to delete one user
  router.delete('/:userId', isAuthenticated, async (req, res) => {
  const { userId } = req.params;
  try {
  await User.findByIdAndDelete(userId)
  res.status(202).json({ message: 'User deleted' });
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: 'Failed to delete the user' });
  }
});


  module.exports = router
