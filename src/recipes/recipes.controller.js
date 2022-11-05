const uuid = require("uuid");
const {Op} = require('sequelize')
const Recipes = require("../models/recipes.models");
const Users = require("../models/users.models");
const Categories = require("../models/categories.models");
const Instruction = require("../models/instruction.models");
const RecipeIngredients = require("../models/recipes_ingredients.models");
const Ingredients = require("../models/ingredients.models");
const Types = require("../models/types.models");
const UserIngredients = require('../models/users_ingredients.models')


const getAllRecipes = async () => {
  const data = await Recipes.findAll({
    attributes: {
      exclude: ["userId", "categoryId", "createdAt", "updatedAt"],
    },
    include: [
      {
        model: Categories,
      },
      {
        model: Users,
        attributes: ["id", "firstName", "lastName"],
      },
      {
        model: Instruction,
        attributes: ["description", "step"],
      },
      {
        model: RecipeIngredients,
        include: {
          model: Ingredients,
          include: {
            model: Types,
          },
        },
      },
    ],
  });
  return data;
};

const getRecipesById = async (id) => {
  const data = await Recipes.findOne({
    where: {
      id,
    },
    attributes: {
      exclude: ["userId", "categoryId", "createdAt", "updatedAt"],
    },
    include: [
      {
        model: Categories,
      },
      {
        model: Users,
        attributes: ["id", "firstName", "lastName"],
      },
      {
        model: Instruction,
        attributes: ["description", "step"],
      },
      {
        model: RecipeIngredients,
        include: {
          model: Ingredients,
          include: {
            model: Types,
          },
        },
      },
    ],
  });
  return data;
};

const createRecipe = async (data) => {
  const response = await Recipes.create({
    id: uuid.v4(),
    title: data.title,
    description: data.description,
    urlImg: data.urlImg,
    time: data.time,
    portions: data.portions,
    userId: data.userId,
    categoryId: data.categoryId,
    origin: data.origin,
    likes: data.likes,
  });
  return response;
};

const updateRecipe = async (id) => {
  const response = await Recipes.update(data, {
    where: {
      id,
    },
  });
  return response;
};

const deletRecipe = async (id) => {
  const data = await Recipes.destroy({
    where: {
      id,
    },
  });
  return data;
};

const getMyRecipes = async(userId) => {
    const userIngredient = await UserIngredients.findAll({
     attributes: ['ingredientId'],
     where:{
      userId
     }
    })
    const filterIngredients = userIngredient.map(obj => obj.ingredientId)
      const recipeIngredients = await RecipeIngredients.findAll({
        where:{
          ingredientId:{
            [Op.or]: filterIngredients
          }
        }
      })

     const filterRecipes = recipeIngredients.map(obj => obj.recipeId)

     const data = await Recipes.findAll({
      where:{
        id: {
          [Op.in]: filterRecipes
        }
      }
     })

    return data
}


module.exports = {
  getAllRecipes,
  getRecipesById,
  createRecipe,
  updateRecipe,
  deletRecipe,
  getMyRecipes
};
