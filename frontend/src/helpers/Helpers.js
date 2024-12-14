import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";

TimeAgo.addDefaultLocale(en);
const pastTime = new TimeAgo("en-us");

export const calcPassedTime = (time) => {
  if (!(time instanceof Date)) time = Date.parse(time);
  return pastTime.format(time);
};

export const getNotificationByErrorCode = (code) => {
  switch (code) {
    case "ERR_NETWORK":
      return {
        title: "Network Error",
        message:
          "It seems you're offline. Please check your internet connection and try again.",
      };

    case "ECONNABORTED":
      return {
        title: "Request Timed Out",
        message:
          "The request took too long to process. Please try again later.",
      };

    case "ERR_BAD_REQUEST":
      return {
        title: "Bad Request",
        message:
          "The server couldn't process your request. Please check the data and try again.",
      };

    case "ERR_BAD_RESPONSE":
      return {
        title: "Server Error",
        message:
          "The server returned an invalid response. Please try again later.",
      };

    case "ERR_CANCELED":
      return {
        title: "Request Canceled",
        message: "The request was canceled by the user.",
      };

    default:
      return {
        title: "Unexpected Error",
        message: "An unexpected error occurred. Please try again.",
      };
  }
};

export const restructureErrors = (errors = []) => {
  const result = {};
  errors.forEach((e) => {
    result[e.key] = e.message;
  });
  return result;
};
