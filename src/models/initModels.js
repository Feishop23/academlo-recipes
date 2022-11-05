const Users = require('./users.models')
const Categories = require('./categories.models')
const Ingredients = require('./ingredients.models')
const Instruction = require('./instruction.models')
const RecipesIngredients = require('./recipes_ingredients.models')
const Recipes = require('./recipes.models')
const Types = require('./types.models')
const UsersIngredients = require('./users_ingredients.models')
const UsersRecipes = require('./users_recipes.models')
const { types } = require('pg')

const initModels = () => {
// hasMany = un usuario tiene muchas recetas
Users.hasMany(Recipes)
// belongsTo = recetas pertenece a un usuario
Recipes.belongsTo(Users)

//>uno a muchos
//un usuario tiene muchas recetas favoritas
Users.hasMany(UsersRecipes)
//una receta pertenece a un solo usuario
UsersRecipes.belongsTo(Users)


//Relacion muchos a muchos
Recipes.hasMany(UsersRecipes)
UsersRecipes.belongsTo(Recipes)


//Users 1:M UserIngredients
Users.hasMany(UsersIngredients)
UsersIngredients.belongsTo(Users)

//Ingredients 1:M UserIngredients
Ingredients.hasMany(UsersIngredients),
UsersIngredients.belongsTo(Ingredients)

//  Categories Recipes
Categories.hasMany(Recipes)
Recipes.belongsTo(Categories)

// Ingredients Types
Types.hasMany(Ingredients)
Ingredients.belongsTo(Types)

// Recipes RecipesIngredients
Recipes.hasMany(RecipesIngredients)
RecipesIngredients.belongsTo(Recipes)

//Ingredients RecipesIngredients
Ingredients.hasMany(RecipesIngredients)
RecipesIngredients.belongsTo(Ingredients)

// Recipes Instructions
Recipes.hasMany(Instruction)
Instruction.belongsTo(Recipes)

}


module.exports = initModels