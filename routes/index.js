const express = require('express')
const router = express.Router()
const userController = require('../controllers/user-controller')
const listController = require('../controllers/list-controller')
const passport = require('../config/passport')
const { generalErrorHandler } = require('../middleware/error-handler')
const { authenticated } = require('../middleware/auth')
/****************************************************************** */
router.get('/signup', userController.signUpPage)
router.post('/signup', userController.signUp)
router.get('/login', userController.loginPage)
router.post('/login', passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), userController.login)
router.get('/logout', userController.logout)

router.get('/userhome', authenticated, listController.getUserHome)
router.use('/', (req, res) => res.redirect('/login'))
router.use('/', generalErrorHandler)
module.exports = router
