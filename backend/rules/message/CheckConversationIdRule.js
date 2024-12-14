import Joi from "joi";
import objectId from "joi-objectid";

Joi.objectId = objectId(Joi);

export const checkConversationIdRule = Joi.object({
  conversationId: Joi.objectId().required(),
});
