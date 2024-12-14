import { Schema } from "mongoose";

const conversationSchema = new Schema(
  {
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: "Users", // Reference to the User model
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Helper function for populating members
async function populateFields(doc) {
  if (doc) {
    await doc.populate("members", "_id email firstname lastname avatar active");
  }
}

conversationSchema.post("save", async function (doc, next) {
  if (this?.options?._skipPopulation) next();
  else {
    await populateFields(doc);
    next();
  }
});

conversationSchema.post(/^find/, async function (docs, next) {
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

conversationSchema.query.withoutPopulation = function () {
  this.options._skipPopulation = true;
  return this;
};
export default conversationSchema;
