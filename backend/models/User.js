import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import config from "config";
import schema from "../database/schema/UserSchema.js";

// Utility function for generate user token
schema.methods.generateAuthToken = function () {
  return jwt.sign(
    {
      id: this._id,
      email: this.email,
      fullname: this.fullName(),
      type: this.isAdmin ? "admin" : "user",
    },
    config.get("JWT.private_key"),
    config.get("JWT.options")
  );
};

// Utility function for get user full name.
schema.methods.fullName = function () {
  return this.firstname + " " + this.lastname;
};

// User Model
const UserModel = mongoose.model("Users", schema);

export { UserModel as User };
