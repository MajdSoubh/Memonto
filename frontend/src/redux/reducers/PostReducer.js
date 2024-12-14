import { store } from "../store/ReduxStore";

const initialState = {
  posts: [],
  uploading: false,
  fetching: false,
  errors: null,
};

const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "RETREIVING_START":
      return { ...state, fetching: true, errors: null };
    case "RETREIVING_SUCCESS":
      return { ...state, fetching: false, posts: action.posts, errors: null };
    case "POST_UPLOAD_START":
      return {
        ...state,
        uploading: true,
        errors: null,
      };
    case "POST_UPLOAD_SUCCESS":
      return {
        ...state,
        posts: [action.post, ...state.posts],
        uploading: false,
        errors: null,
      };
    case "POST_UPLOAD_FAIL":
      return { ...state, uploading: false, errors: action.errors };
    case "REACT_TO_POST":
      const idx = action.post.likes.findIndex(
        (liker) => liker._id === action.user._id
      );
      if (idx > -1) {
        action.post.likes.splice(idx, 1);
      } else {
        action.post.likes.push(action.user);
      }
      return { ...state, uploading: false, errors: action.errors };
    default:
      return state;
  }
};
export default postsReducer;
