import Joi from "joi";
import objectId from "joi-objectid";

Joi.objectId = objectId(Joi);

export const updateUserRule = Joi.object({
  email: Joi.string().trim().email(),
  password: Joi.string().trim().min(8).max(256),
  firstname: Joi.string().trim().min(2).max(100),
  lastname: Joi.string().trim().min(2).max(100),
  worksat: Joi.string().trim().allow("").min(2).max(100),
  bio: Joi.string().trim().allow("").min(2).max(300),
  relationship: Joi.string().trim().allow("").min(2).max(100),
  livesin: Joi.string().trim().allow("").min(2).max(100),
  title: Joi.string().trim().allow("").min(2).max(100),
});
