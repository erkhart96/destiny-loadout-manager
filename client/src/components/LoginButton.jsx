import React, { useState } from "react";

function LoginButton({ user, setUser }) {
  const [loggedIn, setLoggedIn] = useState(false);
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
    setLoggedIn(true);
  };

  const toggleLogout = () => {
    deauthorizeApp();
    setLoggedIn(false);
    setUser();
  };

  return (
    <div>
      {loggedIn ? (
        <button onClick={toggleLogout}>Sign out</button>
      ) : (
        <button onClick={toggleLogin}>Authorize with Bungie</button>
      )}
    </div>
  );
}

export default LoginButton;
