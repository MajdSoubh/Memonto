import Joi from "joi";

export const createPostRule = Joi.object({
  content: Joi.string().min(3).required(),
});
