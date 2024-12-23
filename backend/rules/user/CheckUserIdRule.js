import Joi from "joi";
import objectId from "joi-objectid";

Joi.objectId = objectId(Joi);

export const checkUserIdRule = Joi.object({
  id: Joi.objectId().required(),
});
