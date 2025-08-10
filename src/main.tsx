import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { Provider } from "react-redux";
import store from "./utils/redux/store/index.js";
import CssBaseline from "@mui/material/CssBaseline";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CssBaseline /> {/* resets styles for consistency */}
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
