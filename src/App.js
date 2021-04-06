import logo from './logo.svg';
import './App.css';
import * as AuthService from "./services/authService";
import { useState } from 'react';



function App() {

  const [message, setMessage] = useState("Verifing...");

  const handleButton = async () => {
    AuthService.verifyApp("/app/verify", {}).then((res) => {
      setMessage("Application is working fine")
    }).catch((error) => {
      setMessage(error);
    })
  }


  return (
    <div>
      <button onClick={() => {
        handleButton();
      }}>Verify</button>
      <br /><br />
      <p>{message}</p>
    </div>

  );
}

export default App;
