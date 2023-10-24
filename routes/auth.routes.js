const User = require('../models/User.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { isAuthenticated } = require('../middlewares/routeGuard.middleware')

const router = require('express').Router()


router.get("/", (req, res, next) => {
    res.json("All good in here in auth");
});

// POST to Signup
router.post('/signup', async (req, res) => {
    const salt = bcrypt.genSaltSync(13)
    const passwordHash = bcrypt.hashSync(req.body.password, salt)
    console.log(passwordHash)

    try {
        const newUser = await User.create({ ...req.body, passwordHash }) // { username: 'Eric, passwordHash: "$2a$13$StUm8TwlcRRGzAHwu0qsYu/A.u11PUusPWj/RpWj3H6Z5N/viqRPW" }
        res.status(201).json(newUser)
    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
})

// POST to Login
router.post('/login', async (req, res) => {
    const { userName, password } = req.body
    const potentialUser = await User.findOne({ userName })
    if (potentialUser) {
      if (bcrypt.compareSync(password, potentialUser.passwordHash)) {
        // Good password
        /* const userCopy = JSON.parse(JSON.stringify(potentialUser))
        delete userCopy.passwordHash */
  
        const authToken = jwt.sign({ userId: potentialUser._id }, process.env.TOKEN_SECRET, {
          algorithm: 'HS256',
          expiresIn: '6h',
        })
  
        res.status(200).json({ token: authToken })
      } else {
        // Bad password
        res.status(400).json({ message: 'Bad password' })
      }
    } else {
      // No user with this username
      res.status(400).json({ message: "User doesn't exists" })
    }
  })
  
  router.get('/verify', isAuthenticated, (req, res) => {
    console.log(req.payload)
    res.json(req.payload)
  })

module.exports = router;
