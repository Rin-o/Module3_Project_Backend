const express = require('express');
const router = require('express').Router()
const { isAuthenticated } = require('../middlewares/routeGuard.middleware')


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
      const newUser = await User.findByIdAndUpdate(userId, req.body, { new: true })
      res.status(202).json({ user: newUser })
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
