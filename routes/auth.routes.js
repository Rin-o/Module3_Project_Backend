const User = require('../models/User.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { isAuthenticated } = require('../middlewares/routeGuard.middleware')

const uploader = require('../middlewares/cloudinary.config');

const router = require('express').Router()


router.get("/", (req, res, next) => {
    res.json("All good in here in auth");
});

// POST to Signup
router.post('/signup', uploader.single("image"), async (req, res) => {
    console.log('file is: ', req.file, req.body)
    const salt = bcrypt.genSaltSync(13)
    const passwordHash = bcrypt.hashSync(req.body.password, salt)
    try {
        if(!req.file){
        const newUser = await User.create({ email: req.body.email, userName: req.body.userName, passwordHash }) 
        const userCopy = newUser._doc
        delete userCopy.passwordHash
        res.status(201).json(userCopy)
        } else {
            const newUser = await User.create({ ...req.body, passwordHash, image: req.file.path }) 
            const userCopy = newUser._doc
            delete userCopy.passwordHash
            res.status(201).json(userCopy)
        }
        
    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
})

// POST to Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body

    const potentialUser = await User.findOne({ email })
    if (potentialUser) {
        if (bcrypt.compareSync(password, potentialUser.passwordHash)) {
            const authToken = jwt.sign({ userId: potentialUser._id }, process.env.TOKEN_SECRET, {
                algorithm: 'HS256',
                expiresIn: '6h',
            })

            res.status(200).json({ token: authToken })
        } else {
            res.status(400).json({ message: 'Bad password' })
        }
    } else {
        res.status(400).json({ message: "The user doesn't exists" })
    }
})

router.get('/verify', isAuthenticated, (req, res) => {
    console.log(req.payload)
    res.json(req.payload)
})

router.use((req, res, next) => {
    res.status(404).send('404 - Page Not Found');
  });

module.exports = router;
