const db = require('../models')
const { User } = db
const bcrypt = require('bcryptjs')

/**************************************************************** */
const userController = {
  signUpPage: (req, res) => {
    return res.render('signup')
  },
  signUp: (req, res, next) => {
    const newuser = req.body
    console.log(newuser)
    if (!newuser.email) throw new Error('email必填')
    if (newuser.password !== newuser.passwordCheck) throw new Error('password請重新確認')
    return User.findOne({
      where: { email: newuser.email }
    })
      .then((u) => {
        if (u) throw new Error('email已經被註冊')
        bcrypt.hash(newuser.password, 10).then((hash) => {
          return User.create({
            name: newuser.name,
            email: newuser.email,
            password: hash
          })
        })
      })
      .then(() => {
        res.redirect('/login')
      })
      .catch((err) => next(err))
  },
  login: (req, res) => {
    return res.render('login')
  }
}
/************************************************************* */
module.exports = userController
