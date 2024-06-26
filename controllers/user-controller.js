const db = require('../models')
const { User } = db
const bcrypt = require('bcryptjs')

/**************************************************************** */
const userController = {
  getSignUpPage: (req, res) => {
    return res.render('signup')
  },
  postSignUp: (req, res, next) => {
    const newuser = req.body
    if (!newuser.email) throw new Error('email必填')
    if (newuser.password !== newuser.passwordCheck) throw new Error('password請重新確認')

    return User.findOne({
      where: { email: newuser.email }
    })
      .then((u) => {
        if (u) throw new Error('email已經被註冊')
        return bcrypt.hash(newuser.password, 10).then((hash) => {
          return User.create({
            name: newuser.name,
            email: newuser.email,
            password: hash
          })
        })
      })
      .then(() => {
        req.flash('success_messages', '成功註冊帳號！')
        res.redirect('/user/login')
      })
      .catch((err) => next(err))
  },
  getLoginPage: (req, res) => {
    return res.render('login')
  },
  postLogin: (req, res) => {
    req.flash('success_messages', '成功登入！')
    res.redirect('/lists/userhome')
  },
  getLogout: (req, res) => {
    req.flash('success_messages', '登出成功！')
    req.logout()
    res.redirect('/user/login')
  }
}
/************************************************************* */
module.exports = userController
