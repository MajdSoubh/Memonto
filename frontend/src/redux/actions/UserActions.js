import axios from "../../axios/axios.js";
import { notifications } from "@mantine/notifications";
import {
  getNotificationByErrorCode,
  restructureErrors,
} from "../../helpers/Helpers.js";

export const login = (credentials) => async (dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post("/login", credentials);
      if (response.status === 200 || response.status === 201) {
        dispatch({
          type: "AUTH_SUCCESS",
          token: response.headers.authorization,
          user: response.data,
        });
        resolve(response.data);
      } else if (response.status === 422) {
        const errors = restructureErrors(response?.data?.errors);
        reject(errors);
      } else {
        reject(response.data);
      }
    } catch (error) {
      const errorMessage = getNotificationByErrorCode(error.code);
      notifications.show({
        ...errorMessage,
        position: "top-center",
        color: "orange",
      });
      reject({ failure: error });
    }
  });
};

export const signup = (credentials) => async (dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post("/register", credentials);
      if (response.status === 200 || response.status === 201) {
        dispatch({
          type: "AUTH_SUCCESS",
          token: response.headers.authorization,
          user: response.data,
        });
        resolve(response.data);
      } else if (response.status === 422) {
        const errors = restructureErrors(response?.data?.errors);
        reject(errors);
      } else {
        reject(response.data);
      }
    } catch (error) {
      const errorMessage = getNotificationByErrorCode(error.code);
      notifications.show({
        ...errorMessage,
        position: "top-center",
        color: "orange",
      });
      reject({ failure: error });
    }
  });
};
export const logout = () => async (dispatch) => {
  dispatch({ type: "STATE_RESET" });
};
export const fetchUserData = () => async (dispatch) => {
  try {
    dispatch({ type: "FETCH_USER_START" });
    const response = await axios.get("/me");
    if (response.status === 200) {
      dispatch({
        type: "SET_USER",
        user: response.data,
      });
    } else if (response.status === 422) {
      const errors = restructureErrors(response?.data?.errors);
      dispatch({ type: "FETCH_USER_FAIL", errors });
    }
  } catch (error) {
    notifications.show({
      ...getNotificationByErrorCode(error.code),
      position: "top-center",
      color: "orange",
    });
  }
};

export const updateUser = (data) => async (dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      const payload = new FormData();
      for (let [k, v] of Object.entries(data)) {
        payload.append(k, v);
      }
      const response = await axios.put("/users", payload);

      if (response.status === 200 || response.status === 201) {
        dispatch({
          type: "SET_USER",
          user: response.data,
        });
        resolve(response.data);
      } else if (response.status === 422) {
        const errors = restructureErrors(response?.data?.errors);
        reject(errors);
      } else {
        reject(response.data);
      }
    } catch (error) {
      const errorMessage = getNotificationByErrorCode(error.code);
      notifications.show({
        ...errorMessage,
        position: "top-center",
        color: "orange",
      });
      reject({ failure: error });
    }
  });
};

export const fetchFollowingSuggestions = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get("/users/following-suggestions");
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
export const followUser = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.put(`/users/follow/${userId}`);
      if (response.status === 200) {
        resolve(response.data);
      } else if (response.status === 400) {
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
export const unFollowUser = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.put(`/users/unfollow/${userId}`);
      if (response.status === 200) {
        resolve(response.data);
      } else if (response.status === 400) {
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
export const fetchAccount = async (userId) => {
  try {
    const response = await axios.get(`/users/${userId}`);
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
