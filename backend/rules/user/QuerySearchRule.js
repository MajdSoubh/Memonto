import Joi from "joi";
import objectId from "joi-objectid";

Joi.objectId = objectId(Joi);

export const querySearchRule = Joi.object({
  query: Joi.string().min(1).required(),
});
