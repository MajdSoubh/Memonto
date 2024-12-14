import App from "./App.jsx";
import { createRoot } from "react-dom/client";
import { MantineProvider } from "@mantine/core";
import { Provider } from "react-redux";
import { store } from "./redux/store/ReduxStore.js";
import { BrowserRouter } from "react-router-dom";
import { Notifications } from "@mantine/notifications";
import { StrictMode } from "react";
/* Styles */
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "@styles/globals.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <MantineProvider>
          <Notifications />
          <App />
        </MantineProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
