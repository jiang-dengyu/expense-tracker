const db = require('../models')
const { List, User, Category } = db
const { missingFields } = require('../helpers/list-helpers')
/******************************************* */
const listController = {
  getUserHome: (req, res, next) => {
    const userId = req.user.id
    const categoryId = Number(req.query.categoryId) || ''
    const where = {}
    if (categoryId) where.categoryId = categoryId

    return Promise.all([
      List.findAll({
        where: { userId: userId, ...where },
        include: [Category],
        nest: true,
        raw: true
      }),
      List.sum('price', { where: { userId: userId, ...where } }),
      Category.findAll({
        raw: true
      })
    ])
      .then(([lists, totalPrice, categories]) => {
        return res.render('userhome', { lists, totalPrice, categories, categoryId })
      })
      .catch((err) => next(err))
  },
  getCreatePage: (req, res, next) => {
    return Category.findAll({
      raw: true
    })
      .then((categories) => {
        return res.render('createpage', { categories })
      })
      .catch((err) => next(err))
  },
  postCreate: (req, res, next) => {
    const userId = req.user.id
    const newlist = req.body //表單會有name price category date
    const requiredFields = ['name', 'price', 'categoryId', 'date']

    const results = missingFields(newlist, requiredFields)
    if (results.length > 0) {
      return next(new Error('每個內容都必填'))
    }

    return List.create({
      name: newlist.name,
      price: newlist.price,
      date: newlist.date,
      userId: userId,
      categoryId: newlist.categoryId
    })
      .then(() => {
        req.flash('success_messages', '成功新增！')
        return res.redirect('/lists/userhome')
      })
      .catch((err) => next(err))
  },
  getEditPage: (req, res, next) => {
    const listId = req.params.listId
    const userId = req.user.id

    Promise.all([List.findByPk(listId, { raw: true }), Category.findAll({ raw: true })])
      .then(([list, categories]) => {
        if (list.userId !== userId) {
          req.flash('error_messages', '沒有訪問權限！')
          return res.redirect('/userhome')
        }
        return res.render('editpage', { list, categories })
      })
      .catch((err) => next(err))
  },
  putEdit: (req, res, next) => {
    const userId = req.user.id
    const listId = req.params.listId
    const editlist = req.body
    const requiredFields = ['name', 'price', 'categoryId', 'date']
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
    return List.findOne({
      where: { id: listId }
    })
      .then((list) => {
        if (!list) throw new Error('查無資料')
        return list.update({
          name: editlist.name,
          price: editlist.price,
          date: editlist.date,
          userId: userId,
          categoryId: editlist.categoryId
        })
      })
      .then(() => {
        req.flash('success_messages', '成功編輯！')
        return res.redirect('/lists/userhome')
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
        res.redirect('/lists/userhome')
      })
      .catch((err) => next(err))
  }
}
module.exports = listController
