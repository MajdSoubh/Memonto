import Joi from "joi";
import objectId from "joi-objectid";

Joi.objectId = objectId(Joi);
export const updatePostRule = Joi.object({
  id: Joi.objectId().required(),
  content: Joi.string().min(3),
  // image: Joi.string(),
});
