import { Schema } from "mongoose";
import config from "config";

const postSchema = new Schema(
  {
    publisher: {
      type: Schema.Types.ObjectId,
      ref: "Users", // Reference to the User model
      required: true,
    },
    content: {
      type: String,
      minlength: 2,
      required: true,
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Users", // Reference to the User model
      },
    ],
    images: [
      {
        type: String,
        get: (v) =>
          "".concat(config.get("app.URL"), config.get("storage.image.post"), v),
      },
    ],
  },
  { timestamps: true }
);

// Enable the getters
postSchema.set("toJSON", { getters: true });
postSchema.set("toObject", { getters: true });

// Helper function for populating publisher and likes
async function populateFields(doc) {
  if (doc) {
    await doc.populate(
      "publisher",
      "_id email firstname lastname avatar active"
    );
    await doc.populate("likes", "_id email firstname lastname avatar active");
  }
}
postSchema.post("save", async function (doc, next) {
  if (this?.options?._skipPopulation) next();
  else {
    await populateFields(doc);
    next();
  }
});

postSchema.post(/^find/, async function (docs, next) {
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

postSchema.query.withoutPopulation = function () {
  this.options._skipPopulation = true;
  return this;
};
export default postSchema;
