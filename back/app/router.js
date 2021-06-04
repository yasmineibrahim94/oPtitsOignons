const express = require('express');
const router = express.Router();

// all controller we need
const userController = require('./controllers/userController');
const recipeController = require('./controllers/recipeController');
const categoryController = require('./controllers/categoryController');
const allergyController = require('./controllers/allergyController');
const reviewController = require('./controllers/reviewController');
const groceryController = require('./controllers/groceryController');
const { validateBody } = require('./services/validator');

// all schemas we need
const {userSchema, updateUser, login} = require('./schemas/user');
const {recipeSchema,shareSchema,updateRecipe} = require('./schemas/recipe');
const reviewsSchema = require('./schemas/reviews');
const listShema = require('./schemas/groceryList');
const items = require('./schemas/groceryItems');

// /Router /api

// USER

/**
 * create new user
 * @route POST /signin
 * @group user
 * @param {User.model} user.body
 * @returns {Response.json} 200 - user create
 */
router.post('/signin', validateBody(userSchema), userController.signIn);

/**
 * log new user 
 * @route POST /login
 * @group user
 * @param {User.model} user.body  @example {"email": "monemail@gmail.com","password": "password"}
 * @returns {Response.json} 200 - user create
 */
router.post('/login', validateBody(login), userController.login);

/**
 * disconnect the user
 * @route get /logout
 * @group user
 * @returns {Response.json} 200 - user disconnected
 */
router.get('/logout', userController.disconnect);

/**
 * @route PATCH /user
 * @group user
 * @param {User.model} user.body
 * @returns {Response.json} 200 - user modified
 */
router.patch('/user', validateBody(updateUser) , userController.updateUser);

/**
 * find all users
 * @route GET /user
 * @group user
 * @returns {Response.json} 200 - all users
 */
router.get('/user', userController.findAll);

/**
 * find one users
 * @route GET /user/{id}
 * @group user
 * @param {number} id.path.required - the user id
 * @returns {Response.json} 200 - the user
 * @returns {Product.model}  404 - user do not exist
 */
router.get('/user/:id', userController.findOne);

// RECIPE

/**
 * the recipe who are public
 * @route GET /public/recipes
 * @group recipe
 */
router.get('/public/recipes', recipeController.isPublic);

/**
 * register the new recipe
 * @route POST /user/newrecipe
 * @group recipe
 * @param {Recipe.model} recipe.body.required
 * @returns {Response.json} 200 - the recipe
 */
router.post('/user/newrecipe', validateBody(recipeSchema),recipeController.addRecipe);

/**
 * find one recipe
 * @route GET /recipe/{id}
 * @group recipe
 * @param {number} id.path.required - the recipe id @example 3
 * @returns {Response.json} 200 - the recipe
 */
router.get('/recipe/:id', recipeController.recipe);

/**
 * find all recipes
 * @route GET /recipes
 * @group recipe
 * @returns {Response.json} 200 - the recipes
 */
router.get('/recipes', recipeController.recipes);

/**
 * find all unser's recipes
 * @route GET /recipes/user
 * @group recipe
 * @returns {Response.json} 200 - the unser's recipes
 */
router.get('/recipes/user', userController.usersRecipe);

/**
 * change status
 * @route PATCH /recipe/{id}/share
 * @param {number} id.path.required - the unser's recipes id
 * @param {object} share.body @example {"share": true}
 * @group recipe
 */
router.patch('/recipe/:id/share', validateBody(shareSchema), recipeController.changeStatus);

/**
 * change some recipe's part(s)
 * @group recipe
 * @route patch /recipe/{id}
 * @param {Recipe.model} recipe.body
 * @param {number} id.path.required - the recipe id
 * @return {Response.json} 200 - the update recipe
 */
router.patch('/recipe/:id', validateBody(updateRecipe), recipeController.updateRecipe);

/**
 * change some recipe's ingredient(s)
 * @group recipe
 * @route patch /ingredient/recipe/{id}
 * @param {number} id.path.required - the recipe id
 * @return {Response.json} 200 - the update recipe
 */
router.patch('/ingredient/recipe/:id', recipeController.updateIngredients);

/**
 * copy the recipe from an other
 * @route post /copy-recipe/{recipeid}
 * @group recipe
 * @param {number} recipeid.path.required - the recipe id
*/
router.post('/copy/recipe/:recipeid',  recipeController.copy);

/**
 * delete a recipe
 * @route DELETE /recipe/del/{id}
 * @param {number} id.path.required - the recipe's id
 * @group recipe
 * @returns {Response.json} 200 - the recipe was deleted
 */
router.delete('/recipe/del/:id',recipeController.deleteRecipe);

// CATEGORIES

/**
 * find all allergy
 * @route GET /allergy
 * @group allergy
 * @returns {Response.json} 200 - all allergy
 */
router.get('/allergy',allergyController.allergies);

/**
 * find all difficulty
 * @route GET /difficulty
 * @group difficulty
 * @returns {Response.json} 200 - all difficulty
 */
router.get('/difficulty',categoryController.difficulty);

/**
 * find all categories
 * @route GET /categories
 * @group categories
 * @returns {Response.json} 200 - all categories
 */
router.get('/categories',categoryController.categories);

/**
 * find category
 * @route GET /category/{id}
 * @param {number} id.path.required - the category's id
 * @group categories
 * @returns {Response.json} 200 - category
 */
router.get('/category/:id',categoryController.category);

/**
 * find  category's recipe
 * @route GET /categories/{id}/recipes
 * @param {number} id.path.required - the category's id
 * @group categories
 * @returns {Response.json} 200 - recipes for this category
 */
router.get('/categories/:id/recipes', categoryController.recipesByCategory);

/**
 * find all user's category
 * @route GET /user/recepies/category
 * @param {number} id.path.required - the category's id
 * @group categories
 * @returns {Response.json} 200 - all user's category
 */
router.get('/user/recepies/category', userController.recipesByCategory);

// REVIEW
/**
 * adding review of the recipe
 * @route POST /add/review//recipe/:id
 * @param {number} id.path.required - the recipe's id
 * @param {Review.model} review.body
 * @group review
 * @returns {Response.json} 200 - review added
 */
router.post('/add/review/recipe/:id', validateBody(reviewsSchema) , reviewController.addReview);

/**
 * all review of the recipe
 * @route GET /recipe/{id}/review
 * @param {number} id.path.required - the recipe's id
 * @group review
 * @returns {Response.json} 200 - all review of the recipe
 */
router.get('/recipe/:id/reviews', reviewController.reviewsByRecipe);

/**
 * all user's review
 * @route GET /user/{id}/reviews
 * @param {number} id.path.required - the user's id
 * @group review
 * @returns {Response.json} 200 - all user's review
 */
router.get('/user/:id/reviews', reviewController.usersReviews);

// GROCERY-LIST

/** 
 * create new grocery list
 * @route POST /user/create-grocery
 * @group grocery-list
 * @param {Grocery.model} grocery.body
 * @returns {Response.json} 200 - list create
 */
router.post('/user/create-grocery',validateBody(listShema), groceryController.createNewList);

/** 
 * find the grocery list 
 * @route GET /grocery
 * @group grocery-list
 * @returns {Response.json} 200 - user's grocery list
 */
router.get('/grocery', groceryController.findOneList);

/**
 * del all user's list 
 * @group grocery
 * @route DELETE /grocery/del/all
 * @returns {Response.json} 200 - all list was deleted
 */
router.delete('/grocery/del/all', groceryController.delteList)

/**
 * del one user's list 
 * @group grocery
 * @param {number} id.path.required - the grocery's id
 * @route DELETE /grocery/del/{id}
 * @returns {Response.json} 200 - the list was deleted
 */
router.delete('/grocery/del/:id', groceryController.delteList)

/** 
 * Add an item to the grocery list
 * @route POST /add-items/grocery/{id}
 * @group grocery
 * @param {number} id.path.required - the list's id
 * @param {string} name.body.required - the item's name
 * @returns {Response.json} 200 - user's grocery list with all items
 */
router.post('/add-items/grocery/:id', validateBody(items) ,groceryController.addItem);

/**
 * delete one item from the list
 * @group grocery
 * @route DELETE /item/del/{id}
 * @param {number} id.path.required - the item's id
 * @param {Ingredient.model} ingredient.body
 * @returns {Response.json} 200 - the updated list
 */
router.delete('/item/del/:id', groceryController.removeItem)


// Gestion de la 404 pour l'API
router.use((request, response) => {
    response.status(404).json('Rien par ici');
});

module.exports = router;