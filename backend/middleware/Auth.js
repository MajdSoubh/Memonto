import jwt from "jsonwebtoken";
import config from "config";

export const auth = (type) => {
  return (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) {
      res.status(401).json({ message: "You have to sign in before." });
    }
    try {
      jwt.verify(token, config.get("JWT.private_key"));
    } catch (ex) {
      return res.status(401).json({ message: "Your token is expired." });
    }
    const userData = jwt.decode(token);

    if (userData?.type !== type) {
      res
        .status(403)
        .json({ message: "You don't have the required permission." });
    }

    req.user = userData;

    next();
  };
};
