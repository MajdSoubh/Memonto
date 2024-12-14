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

export const getUserConversations = async (req, res) => {
  const conversations = await Conversation.find({
    members: { $in: [req.user.id] },
  });
  res.status(200).json(
    conversations.sort((a, b) => {
      return new Date(b.updatedAt) - new Date(a.updatedAt);
    })
  );
};
