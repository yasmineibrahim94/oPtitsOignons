const Joi = require('joi');

const listShema = Joi.object({
    name: Joi.string().required()

});

module.exports = listShema;