import React, { useState } from "react";

function LoginButton() {
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

  const toggleLoginLogout = () => {
    authorizeApp();
  };

  return <button onClick={toggleLoginLogout}>Authorize with Bungie</button>;
}

export default LoginButton;
