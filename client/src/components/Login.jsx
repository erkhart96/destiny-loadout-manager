import React from "react";
import "../App.css";
import LoginButton from "./LoginButton";
import ghost from "../images/ghost.png";

function Login() {
  return (
    <div className="loginDiv">
      <div>
        <img className="loginLogo" src={ghost} />
      </div>
      <h1 className="loginTitle">Destiny Loadout Manager</h1>
      <div className="loginButton">
        <LoginButton />
      </div>
    </div>
  );
}

export default Login;
