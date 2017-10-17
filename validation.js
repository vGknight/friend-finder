var Joi = require('joi');

//validate posts to /api/friends contains required properties
module.exports = {
    body: {
        name: Joi.string().required(),
        photo: Joi.string().required(),
        scores: Joi.array().required()

    }
};