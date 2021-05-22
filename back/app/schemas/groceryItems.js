const Joi = require('joi');

const itemShema = Joi.object({
    name: Joi.string().required()

});

module.exports = itemShema;