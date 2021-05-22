const Joi = require('joi');

const reviewShema = Joi.object({
    rate: Joi.number().integer().min(0).max(5).positive().required(),
    content: Joi.string(),

});

module.exports = reviewShema;