
const Recipe = require('../models/recipe');
const recipeMapper = require("../models/recipeMapper");
const recipeController = {

  // Permet de récuperer une recette
  recipe: async (request, response) => {
    // console.log('request.session.user', request.session);
    // console.log('cookie', request.headers.cookie);
    const theRecipe = request.params.id;
    //console.log(theRecipe);
    try {

      let recipe = await recipeMapper.getRecipe(theRecipe);

      // format the review's date
      for (let i = 0; i < recipe.reviews.length; i++) {

        recipe.reviews[i].date = new Date(recipe.reviews[i].date)
        .toLocaleDateString('fr-FR', {  
          day:   'numeric',
          month: 'short',
          year:  'numeric',
      });
      };

      response.json(recipe);

    } catch (err) {
      response.status(404).json(err.message);
    }
    
  },

  // Permet de recuperer toutes recettes partagées
  recipes: async (request, response) => {
    
        try {
        const recipes = await recipeMapper.getAllRecipes();
        //console.log(recipes)
        response.json(recipes);
      ;

    } catch (err) {
      response.status(404).json(err.message);
    }
  },

  // Permet d'ajouter une recipe
  addRecipe: async (request, response) => {
    if (!request.session.user){
      return response.json("pour accéder à vos recettes merci de vous logger");
  } 
    //const {id} = request.session.user;
    let theRecipe = new Recipe(request.body);
    theRecipe.user_id = request.session.user.id;
    const ingredient = 
      [
      request.body.label, // index 0
      request.body.mesure_unit, // index 1
      request.body.allergy_id, // index 2 
      request.body.quantity // index 3
    ];
    

    try {

      await recipeMapper.save(theRecipe, ingredient );
      response.json(recipe);

    } catch (err) {
      response.status(404).json(err.message);
    }
  },
  
  /** 
   * copy the recipe from an other user
   */
  copy: async (request, response) => {

    if (!request.session.user){
      return response.json("pour copier une recettes merci de vous logger");
  } 
    const userId = request.session.user.id;
    const recipeId = request.params.recipeid;
    console.log('recipeId', recipeId);
    //const userId = request.params.userid

    console.log(request.session.user);
    try {

      await recipeMapper.copyRecipe(recipeId, userId);
      response.json(recipe);

    } catch (err) {
      response.status(404).json(err.message);
    }
  },
/**
 * find all public recipes
 */
isPublic: async (request , response) => {

  try {
    const recipes = await recipeMapper.getAllPublicRecipes();
    //console.log(recipes)
    response.json(recipes);
  ;

} catch (err) {
  response.status(404).json(err.message);
}


},

  /**
   * change the visibility of the recipe
   * @returns {response.json}
   */
  changeStatus: async (request, response) => {
    if (!request.session.user){
      return response.json("pour accéder à vos recettes merci de vous logger");
  } 
    const { id } = request.params;
    const { share } = request.body;
    console.log(share);
    try {

      const newRecipe = await recipeMapper.update(id, share);
      response.json(newRecipe);

    } catch (err) {
      response.status(404).json(err.message);
    }
  },

  updateRecipe: async (request, response) => {
    if (!request.session.user){
      return response.json("pour moddifier vos recettes merci de vous logger");
  } 
    const { id } = request.params;
    
    const data = request.body;
  
    try {

      const modifyRecipe = await recipeMapper.updateRecipe(id, data);
      response.json(modifyRecipe);

    } catch (err) {
      response.status(404).json(err.message);
    }
  },

  /**
   * delete a recipe
   * @param {request.session.user.id} id - the id of the recipe
   * @param {request.params.id} userId - the id of the recipe
   */
  deleteRecipe: async (request, response) => {
    if (!request.session.user){
      return response.json("pour supprimer cette recette, merci de vous logger");
  } 
    const userId = request.session.user.id; 
    const { id } = request.params;
    try {

      const delRecipe = await recipeMapper.delete(id, userId);
      response.json(delRecipe);

    } catch (err) {
      response.status(404).json(err.message);
    }
  },

    updateIngredients: async (request, response) => {

      if (!request.session.user){
        return response.json("pour accéder à vos recettes merci de vous logger");
    } 
    const userId = request.session.user.id;

    const { id } = request.params;
    const data = request.body;

    try {

      const changeIngredients = await recipeMapper.patch(id, userId, data);
      response.json(changeIngredients);

    } catch (err) {
      response.status(404).json(err.message);
    }
  }

};

module.exports = recipeController;