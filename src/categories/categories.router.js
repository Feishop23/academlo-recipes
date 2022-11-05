const router = require('express').Router()
const passport = require('passport')
const adminValidate = require('../middlewares/role.middleware')
const categoriaServices = require('./categories.services')

router.route('/')
.get(categoriaServices.getAllCategories)
.post(
    passport.authenticate('jwt',{session: false}),
    adminValidate,
    categoriaServices.postCategory)

router.route('/:id')
.get(categoriaServices.getCategoryById)
.delete(
    passport.authenticate('jwt',{session: false}),
    adminValidate,
    categoriaServices.deleteCategory)

module.exports = router