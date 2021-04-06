import "./App.css";
import * as AuthService from "./services/authService";
import { useState } from "react";
import { Button, AppProvider } from "@shopify/polaris";
import en from "@shopify/polaris/locales/en.json";
import "@shopify/polaris/dist/styles.css";

function App() {
  const [message, setMessage] = useState("Verifing...");

  const handleButton = async () => {
    AuthService.verifyApp("/app/verify", {})
      .then((res) => {
        setMessage("Application is working fine");
      })
      .catch((error) => {
        setMessage(error);
      });
  };

  return (
    <AppProvider i18n={en}>
      <div style={{ textAlign: "center", margin: "30px" }}>
        <Button
          onClick={() => {
            handleButton();
          }}
        >
          Verify
        </Button>
        <br />
        <br />
        <p>{message}</p>
      </div>
    </AppProvider>
  );
}

export default App;
