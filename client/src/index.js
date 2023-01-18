import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { RestaurantsContextProvider } from "./context/RestaurantsContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RestaurantsContextProvider>
      <App />
    </RestaurantsContextProvider>
  </React.StrictMode>
);
