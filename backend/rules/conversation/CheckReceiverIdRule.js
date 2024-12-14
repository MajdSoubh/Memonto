import Joi from "joi";
import objectId from "joi-objectid";

Joi.objectId = objectId(Joi);

export const checkReceiverIdRule = Joi.object({
  receiverId: Joi.objectId().required(),
});
