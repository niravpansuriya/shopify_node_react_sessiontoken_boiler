import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { Provider } from "@shopify/app-bridge-react";
import "@shopify/polaris/dist/styles.css";

//----------------------------------------------------------------------------------

/**
 * get query parameters
 */

const params = new URLSearchParams(window.location.search);
window.shop = params.get("shop");

//----------------------------------------------------------------------------------

ReactDOM.render(
  <React.StrictMode>
    <Provider
      config={{
        apiKey: process.env.REACT_APP_API_KEY,
        shopOrigin: window.shop,
        forceRedirect: true,
      }}
    >
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
