//target物件或是target陣列是否「不含有」field，fasle代表不含有，就篩掉
const missingFields = (target, template) => {
  return template.filter((field) => {
    if (!target.hasOwnProperty(field) || !target[field]) {
      return true
    } else {
      return false
    }
  })
}
module.exports = {
  missingFields
}
