const db = require('../models')
const { List } = db
/******************************************* */
const listController = {
  getUserHome: (req, res, next) => {
    List.findAll({
      raw: true
    })
      .then((lists) => {
        console.log(lists)
        return res.render('userhome', { lists })
      })
      .catch((err) => next(err))
  },
  createListPage: (req, res, next) => {
    return res.render('createpage')
  },
  createList: (req, res, next) => {
    const newlist = req.body //表單會有name price category date
    console.log(newlist)
    const requiredFields = ['name', 'price', 'category', 'date']
    const missingFields = requiredFields.filter((field) => !newlist[field])
    if (missingFields.length > 0) {
      return next(new Error('每個內容都必填'))
    }

    List.create({
      name: newlist.name,
      price: newlist.price,
      category: newlist.category,
      date: newlist.date
    })
      .then(() => {
        return res.redirect('/userhome')
      })
      .catch((err) => next(err))
  }
}
module.exports = listController
