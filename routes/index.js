const express = require('express')
const router = express.Router()
const userController = require('../controllers/user-controller')
/****************************************************************** */
router.get('/signup', userController.signUpPage)
router.post('/signup', userController.signUp)
router.get('/login', userController.login)

router.use('/', (req, res) => res.redirect('/login'))
module.exports = router
