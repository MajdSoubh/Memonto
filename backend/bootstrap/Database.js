import mongoose from "mongoose";
import config from "config";

// IIFE (Immediately Invoked Function Expression) to connect to MongoDB
(function () {
  const dbURI = config.get("db.URI");
  mongoose.connect(dbURI);
})();
