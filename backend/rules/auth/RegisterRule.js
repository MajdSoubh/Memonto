import Joi from "joi";

export const registerRule = Joi.object({
  email: Joi.string().trim().required().email(),
  password: Joi.string().trim().min(8).max(256).required(),
  firstname: Joi.string().trim().min(2).max(100).required(),
  lastname: Joi.string().trim().min(2).max(100).required(),
  title: Joi.string().trim().min(2).max(100).required(),
  password_confirmation: Joi.string()
    .trim()
    .required()
    .valid(Joi.ref("password"))
    .messages({ "any.only": "Password confirmation must match password" }),
});
