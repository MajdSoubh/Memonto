import { Schema } from "mongoose";

const messageSchema = new Schema(
  {
    conversationId: {
      type: Schema.Types.ObjectId,
      ref: "Conversations", // Reference to the chat model
    },
    sender: {
      type: Schema.Types.ObjectId,
      ref: "Users", // Reference to the user model
    },
    text: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Helper function for populating sender
async function populateFields(doc) {
  if (doc) {
    await doc.populate("sender", "_id email firstname lastname avatar active");
  }
}

messageSchema.post("save", async function (doc, next) {
  if (this?.options?._skipPopulation) next();
  else {
    await populateFields(doc);
    next();
  }
});

messageSchema.post(/^find/, async function (docs, next) {
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

messageSchema.query.withoutPopulation = function () {
  this.options._skipPopulation = true;
  return this;
};
export default messageSchema;
