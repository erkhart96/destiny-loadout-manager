import React, { useState } from "react";

function LoginButton() {
  const [loggedIn, setLoggedIn] = useState(false);
  const authorizeApp = () => {
    let url = "https://localhost:3000/users/sign_in";
    const loginPopup = window.open(
      url,
      "popup",
      "menubar=no,width=600,height=925"
    );
    const checkPopup = setInterval(() => {
      if (loginPopup.window.location.href.includes("https://localhost:3000"))
        loginPopup.close();
      if (!loginPopup || !loginPopup.closed) return;
      clearInterval(checkPopup);
      console.log("login:", loginPopup.window.location.href);
      window.location.href = loginPopup.window.location.href;
    }, 100);
  };

  const deauthorizeApp = () => {
    let url = "https://localhost:3000/users/sign_out";
    const loginPopup = window.open(
      url,
      "popup",
      "menubar=no,width=600,height=925"
    );
    const checkPopup = setInterval(() => {
      if (
        loginPopup.window.location.href.includes(
          "https://localhost:3000/users/sign_out"
        )
      )
        loginPopup.close();
      if (!loginPopup || !loginPopup.closed) return;
      clearInterval(checkPopup);
      console.log("login:", loginPopup.window.location.href);
      window.location.href = loginPopup.window.location.href;
    }, 100);
  };

  const toggleLogin = () => {
    authorizeApp();
    setLoggedIn(true);
  };

  const toggleLogout = () => {
    deauthorizeApp();
    setLoggedIn(false);
  };

  console.log(loggedIn);
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
