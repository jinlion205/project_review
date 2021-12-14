const Joi = require('joi');
const { password } = require('./custom.validation');

const register = Joi.object({
  name: Joi.string()
      .required(),

  password: Joi.string()
      .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

  // repeat_password: Joi.ref('password'),

  email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
});

const login = Joi.object({

  email: Joi.string().required()
  .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),

  password: Joi.string().required()
      .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))

});


module.exports = {
  register,
  login,
};
