const Joi = require('joi');

const recipeSchema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    prepare_time: Joi.string(),
    cooking_time: Joi.string(),
    image: Joi.string(),
    part_number: Joi.number().integer().positive().required(), 
    part_type: Joi.string().required(),
    share: Joi.boolean().valid(true, false).default(false).required(),
    category_id: Joi.number().integer().positive().required(),
    description: Joi.string().min(20),
    difficulty_id: Joi.number().integer().positive().required(),
    label: Joi.array().items(Joi.string()),
    mesure_unit: Joi.array().items(Joi.string()),
    allergy_id: Joi.array().items(Joi.number().allow(null)),
    quantity: Joi.array().items(Joi.number())
});
const shareSchema = Joi.object({

    share: Joi.boolean().valid(true, false).default(false).required()
});
const updateRecipe = Joi.object({

    name: Joi.string().min(3).max(100).required(),
    prepare_time: Joi.string(),
    cooking_time: Joi.string(),
    image: Joi.string(),
    part_number: Joi.number().integer().positive().required(), 
    part_type: Joi.string().required(),
    share: Joi.boolean().valid(true, false).default(false).required(),
    category_id: Joi.number().integer().positive().required(),
    description: Joi.string().min(20),
    difficulty_id: Joi.number().integer().positive().required(),
    share: Joi.boolean().valid(true, false).default(false).required()
});

module.exports ={ recipeSchema ,shareSchema, updateRecipe } ;