const initialState = {
  token: null,
  user: null,
  notifications: { messages: [] },
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "AUTH_SUCCESS":
      return {
        ...state,
        token: action.token,
        user: action.user,
      };
    case "AUTH_FAIL":
      return { ...state, token: null };
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    case "FOLLOW_USER":
      const followerIndex = state?.user?.following.findIndex(
        (userId) => userId === action.user._id
      );
      if (followerIndex === -1) {
        state?.user?.following.push(action.user._id);
      }
      return {
        ...state,
        user: state?.user,
      };
    case "UNFOLLOW_USER":
      const unfollowerIndex = state?.user?.following.findIndex(
        (userId) => userId === action.user._id
      );
      if (unfollowerIndex > -1) {
        state?.user?.following.splice(unfollowerIndex, 1);
      }
      return {
        ...state,
        user: state?.user,
      };
    case "PUSH_NOTIFICATION":
      switch (action.level) {
        case "messeage":
          return {
            ...state,
            notifications: {
              ...state.notifications,
              messages: [...(state.notifications?.messages || []), action.data],
            },
          };
        default:
          return { state };
      }
    case "READ_MESSAGE_NOTIFICATIONS":
      return {
        ...state,
        notifications: {
          ...state.notifications,
          messages: [],
        },
      };

    case "TOKEN_EXPIRED":
      return { ...state, user: null, token: null };
    case "STATE_RESET":
      return { ...state, user: null, token: null };
    default:
      return state;
  }
};
export default userReducer;
