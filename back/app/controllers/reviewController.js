
const Review = require('../models/review');
const reviewMapper = require("../models/reviewMapper");

const reviewController = {

  // Permet de récuperer une review d'une recette
  reviewsByRecipe: async (request, response) => {

    const theRecipe = request.params.id;
    console.log(theRecipe);

    try {

    const recipe = await reviewMapper.getReviewsByRecipe(theRecipe);
    response.json(recipe);

    }catch (err) {
        response.status(404).json(err.message);
    }
    },

    usersReviews: async (request, response) => {

      const theUser = request.params.id;
      console.log(theUser);
  
      try {
  
      const user = await reviewMapper.getReviewsByUser(theUser);
      response.json(user);
      }catch (err) {
          response.status(404).json(err.message);
      }
      },

  // Ajout d'une review
  addReview: async (request, response) => {
    
    if (!request.session.user){
      return response.json("seule les personne enregistrer on la possibilitée de laisser un avis ; merci de vous logger");
  }
    let theReview = new Review({
      rate: request.body.rate,
      content: request.body.content,
      user_id: request.session.user.id,
      recipe_id : request.params.id
    });
    console.log(theReview);
  
    try {

    await reviewMapper.save(theReview);
    response.json(theReview);

    }catch (err) {
        response.status(404).json(err.message);
    }

  }
}

module.exports = reviewController;