import { notifications } from "@mantine/notifications";
import axios from "../../axios/axios.js";
import {
  getNotificationByErrorCode,
  restructureErrors,
} from "../../helpers/Helpers.js";
export const getTimelinePosts = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get("/posts/timeline");
      if (response.status === 200) {
        resolve(response.data);
      }
    } catch (error) {
      notifications.show({
        ...getNotificationByErrorCode(error.code),
        position: "top-center",
        color: "orange",
      });
      reject(error);
    }
  });
};
export const fetchUserPosts = async (userId) => {
  try {
    const response = await axios.get(`/posts/users/${userId}`);
    if (response.status === 200) {
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

export const uploadPost = (post) => async (dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      const payload = new FormData();
      payload.append("content", post.content);
      post?.images?.forEach((image) => {
        payload.append("images[]", image);
      });

      const response = await axios.post("/posts", payload);
      if (response.status === 200 || response.status === 201) {
        resolve(response.data.data);
      } else if (response.status === 422) {
        const errors = restructureErrors(response?.data?.errors);
        reject(errors);
      }
    } catch (error) {
      notifications.show({
        ...getNotificationByErrorCode(error.code),
        position: "top-center",
        color: "orange",
      });
      reject({ failure: error });
    }
  });
};

export const reactToPost = async (post) => {
  try {
    const response = await axios.put(`/posts/react/${post._id}`);
    if (response.status === 200) {
      return true;
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
