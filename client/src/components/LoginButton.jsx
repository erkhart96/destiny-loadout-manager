import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { StateContext } from "../context/StateContext";
import { Button } from "@mui/material";

function LoginButton({ setUser }) {
  const { userProfile, setUserProfile } = useContext(StateContext);
  let navigate = useNavigate();

  const authorizeApp = () => {
    let url = "https://localhost:3000/users/sign_up";
    window.location = url;
  };

  const toggleLogin = () => {
    authorizeApp();
  };

  const toggleLogout = () => {
    setUser();
    setUserProfile();
    navigate("/");
  };

  return (
    <div>
      {userProfile ? (
        <button onClick={toggleLogout}>Sign out</button>
      ) : (
        <Button
          onClick={toggleLogin}
          variant="contained"
          color="success"
          style={{ textTransform: "none" }}
        >
          Authorize with Bungie
        </Button>
      )}
    </div>
  );
}

export default LoginButton;
