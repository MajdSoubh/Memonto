import Joi from "joi";
import objectId from "joi-objectid";

Joi.objectId = objectId(Joi);
export const checkPostIdRule = Joi.object({
  id: Joi.objectId().required(),
});
