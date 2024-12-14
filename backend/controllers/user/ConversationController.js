import { Conversation } from "../../models/Conversation.js";

export const createConversation = async (req, res) => {
  let status = 200;
  let conversation = await Conversation.findOne({
    members: [req.user.id, req.body.receiverId],
  });

  if (!conversation) {
    conversation = new Conversation({
      members: [req.user.id, req.body.receiverId],
    });
    conversation = await conversation.save();
    status = 201;
  }
  res.status(status).json(conversation);
};
