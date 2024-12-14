import Joi from "joi";
import objectId from "joi-objectid";

Joi.objectId = objectId(Joi);

export const followUserRule = (req) => {
  const userId = req.user.id;
  return Joi.object({
    id: Joi.objectId()
      .invalid(userId)
      .required()
      .messages({ "any.invalid": "You cannot follow yourself" }),
  });
};
