const express = require('express')
const routes = require('./routes')
const handlebars = require('express-handlebars')
const app = express()
const port = process.env.PORT || 3000
const flash = require('connect-flash')
const session = require('express-session')
const SESSION_SECRET = 'secret'
const passport = require('./config/passport')
const { getUser } = require('./helpers/auth-helpers')
const methodOverride = require('method-override')
const handlebarsHelpers = require('./helpers/handlebars-helpers')

app.use(express.urlencoded({ extended: true }))
app.engine('hbs', handlebars({ extname: '.hbs', helpers: handlebarsHelpers }))
app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended: true })) //讓res.body能夠使用(bodyparser)
app.use(session({ secret: SESSION_SECRET, resave: false, saveUninitialized: false })) //設定session資訊
app.use(passport.initialize()) //初始化 Passport
app.use(passport.session()) //啟動 session 功能
app.use(flash()) // 掛載套件
app.use(methodOverride('_method'))
app.use((req, res, next) => {
  res.locals.success_messages = req.flash('success_messages') //falsh跟req.user存到locals當中
  res.locals.error_messages = req.flash('error_messages')
  res.locals.user = getUser(req)
  next()
})

app.use(routes)
app.listen(port, () => {
  console.info(`Example app listening on port ${port}!`)
})
module.exports = app
