import { createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { reducers } from "../reducers";

const loadStateFromSessionStorage = () => {
  const serializedState = sessionStorage.getItem("SOCIAL_APP_STATE");
  if (serializedState === null) {
    return {}; // No state saved in sessionStorage
  }
  return JSON.parse(serializedState);
};

// Function to save state to sessionStorage
const saveStateToSessionStorage = (state) => {
  const serializedState = JSON.stringify(state);
  sessionStorage.setItem("SOCIAL_APP_STATE", serializedState);
};

export const store = createStore(
  reducers,
  loadStateFromSessionStorage(),
  applyMiddleware(thunk)
);

// Save state to sessionStorage on every state change
store.subscribe(() => {
  saveStateToSessionStorage(store.getState());
});
