const Joi = require('joi');

const recipeSchema = Joi.object({
    name: Joi.string().min(3).max(100),
    prepare_time: Joi.string(),
    cooking_time: Joi.string(),
    image: Joi.string(),
    part_number: Joi.number().integer().positive(),
    part_type: Joi.string(),
    share: Joi.boolean().valid(true, false).default(false),
    category_id: Joi.number().integer().positive(),
    description: Joi.string().min(20),
    difficulty_id: Joi.number().integer().positive(),
    label: Joi.string(),
    mesure_unit: Joi.array().items(Joi.string()),
    allergy_id: Joi.array().items(Joi.number().allow(null)),
    quantity: Joi.array().items(Joi.number())
});
const shareSchema = Joi.object({

    share: Joi.boolean().valid(true, false).default(false)
});
const updateRecipe = Joi.object({

    name: Joi.string().min(3).max(100),
    prepare_time: Joi.string(),
    cooking_time: Joi.string(),
    image: Joi.string(),
    part_number: Joi.number().integer().positive(), 
    part_type: Joi.string(),
    share: Joi.boolean().valid(true, false).default(false),
    category_id: Joi.number().integer().positive(),
    description: Joi.string().min(20),
    difficulty_id: Joi.number().integer().positive(),
    share: Joi.boolean().valid(true, false).default(false)
});

module.exports ={ recipeSchema ,shareSchema, updateRecipe } ;