import Joi from "joi";

export const loginRule = Joi.object({
  email: Joi.string().trim().required().email(),
  password: Joi.string().trim().min(8).max(256).required(),
});
