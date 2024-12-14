import Joi from "joi";
import objectId from "joi-objectid";

Joi.objectId = objectId(Joi);

export const createMessageRule = Joi.object({
  conversationId: Joi.objectId().required(),
  receiverId: Joi.objectId().required(),
  text: Joi.string().min(1).required(),
});
