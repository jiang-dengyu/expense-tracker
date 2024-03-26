const userController = {
  login: (req, res) => {
    return res.render('login')
  },
  signup: (req, res) => {
    return res.render('signup')
  }
}
module.exports = userController
