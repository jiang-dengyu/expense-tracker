const db = require('../models')
const { User } = db
const bcrypt = require('bcryptjs')

/**************************************************************** */
const userController = {
  signUpPage: (req, res) => {
    console.log('斷點1')
    return res.render('signup')
  },
  signUp: (req, res, next) => {
    const newuser = req.body
    console.log(newuser)
    if (!newuser.email) throw new Error('email必填')
    if (newuser.password !== newuser.passwordCheck) throw new Error('password請重新確認')
    User.findOne({
      where: { email: newuser.email }
    })
      .then((u) => {
        if (u) throw new Error('email已經被註冊')
        return bcrypt.hash(newuser.password, 10).then((hash) => {
          User.create({
            name: newuser.name,
            email: newuser.email,
            password: hash
          })
        })
      })
      .then(() => {
        console.log('斷點2')
        req.flash('success_messages', '成功註冊帳號！')
        res.redirect('/login')
      })
      .catch((err) => next(err))
  },
  loginPage: (req, res) => {
    console.log('斷點3')
    return res.render('login')
  },
  login: (req, res) => {
    console.log('斷點4')
    req.flash('success_messages', '成功登入！')
    res.redirect('/userhome')
  },
  logout: (req, res) => {
    req.flash('success_messages', '登出成功！')
    req.logout()
    res.redirect('/login')
  }
}
/************************************************************* */
module.exports = userController
