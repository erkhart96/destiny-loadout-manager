import React, { useState, useContext } from "react";
import { StateContext } from "../context/StateContext";

function LoginButton({ user, setUser }) {
  const { userProfile } = useContext(StateContext);

  const authorizeApp = () => {
    let url = "https://localhost:3000/users/sign_in";
    window.open(url, "popup", "menubar=no,width=600,height=925");
  };

  const deauthorizeApp = () => {
    let url = "https://localhost:3000/users/sign_out";
    window.open(url, "popup", "menubar=no,width=600,height=925");
  };

  const toggleLogin = () => {
    authorizeApp();
  };

  const toggleLogout = () => {
    deauthorizeApp();
    setUser();
  };

  return (
    <div>
      {userProfile ? (
        <button onClick={toggleLogout}>Sign out</button>
      ) : (
        <button onClick={toggleLogin}>Authorize with Bungie</button>
      )}
    </div>
  );
}

export default LoginButton;
