const recipeController = require("./recipes.controller");
const Recipe = require("../models/recipes.models");

const getAllRecipes = (req, res) => {
  recipeController
    .getAllRecipes()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
};

const getRecipeById = (req, res) => {
  const id = req.params.recipe_id;
  recipeController.getRecipesById(id).then((data) => {
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(404).json({ message: "Invalid ID", id });
    }
  });
};

const createRecipe = (req, res) => {
  const userId = req.user.id;
  const {
    title,
    description,
    urlImg,
    time,
    portions,
    categoryId,
    origin
  } = req.body;

  if (title && description && time && portions && categoryId) {
    recipeController
      .createRecipe({
        title,
        description,
        urlImg,
        time,
        portions,
        categoryId,
        origin,
        userId,
      })
      .then((data) => {
        res.status(201).json(data);
      })
      .catch((err) => {
        res.status(400).json({ message: err.message });
      });
  } else {
    res.status(400).json({
      message: "Missing Data",
      fields: {
        title: "string",
        description: "string",
        time: "number",
        portions: "number",
        categoryId: "number",
      },
    });
  }
};

const patchRecipes = (req, res) => {
  const { title, description, urlImg, time, portions, categoryId, origin } = req.body;
  const id = req.params.recipe_id
  recipeController.updateRecipe(id, {title, description, urlImg, time, portions, categoryId, origin})
  .then(data => {
   if(data[0]){
   res.status(200).json({message: `Recipe with Id: ${id} edited succesfylly`})
   }else{
    res.status(400).json({message: 'invalid', id})
   }
})
  .catch((err) => {
    res.status(400).json({ message: err.message });
  })
};

const deleteRecipe = (req,res) => {
  const id = req.params.recipe_id
  recipeController.deletRecipe(id)
  .then(data => {
    if(data){
      res.status(204).json()
    }else{
      res.status(404).json({message: 'Invalid Id', id})
    }
  })
  .catch(err => {
    res.status(400).json({message: err.message})
  })
}

const getUserRecipes = (req, res) => {
  const userId = req.user.id
  recipeController.getMyRecipes(userId)
  .then(data => {
  res.status(200).json(data)
  })
  .catch(err => {
   res.status(400).json({message: err.message})
  })
}

module.exports = {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  patchRecipes,
  deleteRecipe,
  getUserRecipes
}