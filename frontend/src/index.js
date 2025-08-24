import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { ThemeProvider } from "./context/ThemeContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <ThemeProvider>
      {/* Add this div to apply background and text colors for light/dark mode */}
      <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
        <RouterProvider router={router} />
      </div>
    </ThemeProvider>
  </Provider>
);

reportWebVitals();
