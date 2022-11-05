const passport = require('passport')

const router = require('express').Router()
const recipeServices = require('./recipes.services')
require('../middlewares/auth.middleware')(passport)


router.route('/')
.get(recipeServices.getAllRecipes)
.post(
passport.authenticate('jwt', {session: false}),
recipeServices.createRecipe)

router.route('/:recipe_id')
.get(recipeServices.getRecipeById)
.patch(
    passport.authenticate('jwt',{session:false}),
    recipeServices.patchRecipes
)
.delete(
    passport.authenticate('jwt',{session:false}),
     recipeServices.deleteRecipe
)

module.exports = router