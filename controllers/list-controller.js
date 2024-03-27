const db = require('../models')
const { List } = db
/******************************************* */
const listController = {
  getUserHome: (req, res, next) => {
    List.findAll({
      raw: true
    })
      .then((lists) => {
        return res.render('userhome', { lists })
      })
      .catch((err) => next(err))
  },
  createListPage: (req, res, next) => {
    return res.render('createpage')
  },
  createList: (req, res, next) => {
    const newlist = req.body //表單會有name price category date
    const requiredFields = ['name', 'price', 'category', 'date']
    const missingFields = requiredFields.filter((field) => {
      if (!newlist.hasOwnProperty(field) || !newlist[field]) {
        return true
      } else {
        return false
      }
    })
    if (missingFields.length > 0) {
      return next(new Error('每個內容都必填'))
    }

    List.create({
      name: newlist.name,
      price: newlist.price,
      date: newlist.date
    })
      .then(() => {
        req.flash('success_messages', '成功新增！')
        return res.redirect('/userhome')
      })
      .catch((err) => next(err))
  },
  editListPage: (req, res, next) => {
    console.log('斷點1')
    const listId = req.params.listId
    List.findOne({
      where: { id: listId },
      raw: true
    })
      .then((list) => {
        console.log('斷點2', list)
        return res.render('editpage', { list })
      })
      .catch((err) => next(err))
  },
  putList: (req, res, next) => {
    const listId = req.params.listId
    const editlist = req.body
    const requiredFields = ['name', 'price', 'category', 'date']
    const missingFields = requiredFields.filter((field) => {
      if (!editlist.hasOwnProperty(field) || !editlist[field]) {
        return true
      } else {
        return false
      }
    })
    if (missingFields.length > 0) {
      return next(new Error('每個內容都必填'))
    }
    console.log('斷點3')
    List.findOne({
      where: { id: listId }
    })
      .then((list) => {
        if (!list) throw new Error('查無資料')
        return list.update({
          name: editlist.name,
          price: editlist.price,
          date: editlist.date
        })
      })
      .then(() => {
        req.flash('success_messages', '成功編輯！')
        return res.redirect('/userhome')
      })
  },
  deleteList: (req, res, next) => {
    const listId = req.params.listId
    return List.findByPk(listId)
      .then((list) => {
        if (!list) throw new Error("List didn't exist!")
        return list.destroy()
      })
      .then(() => {
        req.flash('success_messages', '成功刪除！')
        res.redirect('/userhome')
      })
      .catch((err) => next(err))
  }
}
module.exports = listController
