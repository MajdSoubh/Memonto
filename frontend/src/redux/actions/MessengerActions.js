import axios from "../../axios/axios.js";
import { notifications } from "@mantine/notifications";
import { getNotificationByErrorCode } from "../../helpers/Helpers.js";

export const fetchConversations = async () => {
  try {
    const response = await axios.get("/conversations");
    if (response.status === 200 || response.status === 201) {
      return response.data;
    }
  } catch (error) {
    notifications.show({
      ...getNotificationByErrorCode(error.code),
      position: "top-center",
      color: "orange",
    });
    throw error;
  }
};
export const fetchMessages = async (conversationId) => {
  try {
    const response = await axios.get(`/messages/${conversationId}`);
    if (response.status === 200 || response.status === 201) {
      return response.data;
    }
  } catch (error) {
    notifications.show({
      ...getNotificationByErrorCode(error.code),
      position: "top-center",
      color: "orange",
    });
    throw error;
  }
};
export const sendMessage = async ({ receiverId, conversationId, text }) => {
  try {
    await axios.post("/messages", {
      conversationId,
      text,
      receiverId,
    });
  } catch (error) {
    notifications.show({
      ...getNotificationByErrorCode(error.code),
      position: "top-center",
      color: "orange",
    });
    throw error;
  }
};
export const createConversation = async (receiverId) => {
  try {
    const response = await axios.post("/conversations", { receiverId });
    if (response.status === 200 || response.status === 201) {
      return response.data;
    }
  } catch (error) {
    notifications.show({
      ...getNotificationByErrorCode(error.code),
      position: "top-center",
      color: "orange",
    });
    throw error;
  }
};
