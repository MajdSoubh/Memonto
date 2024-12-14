import axios from "axios";
import { store } from "../redux/store/ReduxStore";

const host = import.meta.env.VITE_API_BASE_URL;

const http = axios.create({
  baseURL: `${host}/`,
  withCredentials: false,
});

http.interceptors.request.use((request) => {
  const token = store.getState().userReducer.token;
  request.headers.Authorization = token;
  return request;
});
http.interceptors.response.use(
  (response) => response,
  (config) => {
    // Reject response when server does not response or an internal server error occured.
    if (!config?.response || config.response.status >= 500) {
      return Promise.reject(config);
    }
    // Redirect to the login page when the user is not authenticated or token expired
    if (config?.response.status === 401) {
      store.dispatch({ type: "TOKEN_EXPIRED" });
      window.location.replace("/login");
      return config.response;
    }

    // Normal case (status code 40x)
    return config.response;
  }
);

export default http;
