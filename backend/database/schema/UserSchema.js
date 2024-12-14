import { Schema } from "mongoose";
import config from "config";

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
      maxlength: 255,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 100,
      select: false,
    },
    firstname: {
      type: String,
      set: (v) => (v = v[0]?.toUpperCase() + v?.substring(1)),
      minlength: 3,
      maxlength: 100,
      required: true,
      trim: true,
    },
    lastname: {
      type: String,
      set: (v) => (v = v[0]?.toUpperCase() + v?.substring(1)),
      required: true,
      maxlength: 100,
      minlength: 3,
      trim: true,
    },

    isAdmin: { type: Boolean, default: false },
    avatar: {
      type: String,
      get: (v) => {
        if (!v) {
          return null;
        }
        return "".concat(
          config.get("app.URL"),
          config.get("storage.image.profile"),
          v
        );
      },
    },
    backgroundImage: {
      type: String,
      get: (v) => {
        if (!v) {
          return null;
        }
        return "".concat(
          config.get("app.URL"),
          config.get("storage.image.profile"),
          v
        );
      },
    },
    active: Boolean,
    title: String,
    bio: String,
    livesin: String,
    worksat: String,
    relationship: String,
    followers: [
      {
        type: Schema.Types.ObjectId,
        ref: "Users", // Reference to the User model
      },
    ],
    following: [
      {
        type: Schema.Types.ObjectId,
        ref: "Users", // Reference to the User model
      },
    ],
    socketId: String,
  },
  { timestamps: true }
);

// Enable the getters
userSchema.set("toJSON", { getters: true });
userSchema.set("toObject", { getters: true });

// Helper function for populating
function populateFields(doc) {
  if (doc) {
    doc.populate("followers", "_id email firstname lastname avatar active");
    doc.populate("following", "_id email firstname lastname avatar active");
  }
}

userSchema.post("save", async function (doc, next) {
  if (this?.options?._skipPopulation) next();
  else {
    await populateFields(doc);
    next();
  }
});

userSchema.post(/^find/, async function (docs, next) {
  if (this?.options?._skipPopulation) next();
  else {
    if (Array.isArray(docs)) {
      await Promise.all(docs.map(populateFields));
    } else {
      await populateFields(docs);
    }
    next();
  }
});

userSchema.query.withoutPopulation = function () {
  this.options._skipPopulation = true;
  return this;
};

export default userSchema;
