import { dispatchEvent } from "../../events/Events.js";
import { Message } from "../../models/Message.js";

export const addMessage = async (req, res) => {
  const { conversationId, receiverId, text } = req.body;

  const message = new Message({
    conversationId,
    sender: req.user.id,
    text,
  });

  const result = await message.save();

  dispatchEvent(receiverId, "receiveMessage", result);

  res.status(200).json(result);
};

export const getMessages = async (req, res) => {
  const { conversationId } = req.params;

  const result = await Message.find({ conversationId });
  res.status(200).json(result);
};
