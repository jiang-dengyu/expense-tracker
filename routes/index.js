const express = require('express')
const router = express.Router()
const userController = require('../controllers/user-controller')
const listController = require('../controllers/list-controller')
const passport = require('../config/passport')
const { generalErrorHandler } = require('../middleware/error-handler')
const { authenticated } = require('../middleware/auth')

/****************************************************************** */
router.get('/user/signup', userController.getSignUpPage)
router.post('/user/signup', userController.postSignUp)
router.get('/user/login', userController.getLoginPage)
router.post('/user/login', passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), userController.postLogin)
router.get('/user/logout', userController.getLogout)

/****************************************************************** */
router.get('/lists/userhome', authenticated, listController.getUserHome)
router.get('/lists/create', authenticated, listController.getCreatePage)
router.post('/lists/create', authenticated, listController.postCreate)
router.get('/lists/edit/:listId', authenticated, listController.getEditPage)
router.put('/lists/edit/:listId', authenticated, listController.putEdit)
router.delete('/lists/delete/:listId', authenticated, listController.deleteList)

/****************************************************************** */
router.use('/', (req, res) => res.redirect('/user/login'))
router.use('/', generalErrorHandler)
module.exports = router
