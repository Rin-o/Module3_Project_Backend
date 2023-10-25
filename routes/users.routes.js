const router = require('express').Router()
const { isAuthenticated } = require('../middlewares/routeGuard.middleware')


// POST to create a new user
router.post('/', isAuthenticated, async (req, res) => {
    try {
      const responseFromAPI = await fetch(`http://localhost:5005/users`, {
        method: 'POST',
        body: JSON.stringify(req.body),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (responseFromAPI.ok) {
        const newUser = await responseFromAPI.json()
        res.status(201).json(newUser)
      }
    } catch (error) {
      console.log(error)
    }
  })

  // PUT to update an existing user
  router.put('/:id', async (req, res) => {
    console.log(req.body)
    try {
      const responseFromAPI = await fetch(
        `http://localhost:5005/users/${req.params.id}`,
        {
          method: 'PUT',
          body: JSON.stringify(req.body),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      if (responseFromAPI.ok) {
        const userFromAPI = await responseFromAPI.json()
        res.json({ user: userFromAPI })
      }
    } catch (error) {
      console.error(error)
    }
  })

  // DELETE to delete one user
  router.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
      await fetch(`http://localhost:5005/api/users/${id}`, {
        method: 'DELETE',
      })
      res.status(204).send()
    } catch (error) {
      res.status(500).json({ error })
    }
  })

  module.exports = router
