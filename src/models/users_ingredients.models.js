const {DataTypes} = require('sequelize')
const db = require('../utils/database')
const Users = require('../models/users.models')
const Ingredients = require('../models/ingredients.models')

const UsersIngredients = db.define('users_ingredients',{
  id:{
    type:DataTypes.UUID,
    primaryKey:true,
    allowNull:false
  },
  amount:{
    type:DataTypes.STRING,
    allowNull:false
  } ,
  userId:{
    type:DataTypes.UUID,
    allowNull:false,
    field:'user_id',
    references:{
        key:'id',
        model: Users
    }
  },
  ingredientId:{
    type:DataTypes.UUID,
    allowNull:false,
    field: 'ingredient_id',
    references:{
        key: 'id',
        model: Ingredients
    }

  }
})

module.exports = UsersIngredients