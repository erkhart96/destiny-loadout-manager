import React, { useContext, useEffect } from "react";
import { StateContext } from "../context/StateContext";
import { Routes, Route } from "react-router-dom";
import LoginButton from "./LoginButton";
import { Link } from "react-router-dom";
import ghostLogo from "../images/ghost.png";
import { useNavigate } from "react-router-dom";

const Nav = () => {
  const { user, setUser } = useContext(StateContext);
  useEffect(() => {
    fetch("/users")
      .then((res) => res.json())
      .then((data) => {
        setUser(data[0]);
      });
  }, []);

  let navigate = useNavigate();
  const handleLogoClick = () => {
    navigate("/home");
  };

  return (
    <nav>
      <img className="logo" src={ghostLogo} onClick={handleLogoClick} />
      <div className="links">
        <Link to="/home">Home</Link>
        <Link to="/loadouts">Loadouts</Link>
        <Link to="/about">About</Link>
      </div>
      <div className="userInfo">
        <h4 className="userName">{user ? user.display_name : ""}</h4>
        {user ? <LoginButton user={user} setUser={setUser} /> : ""}
      </div>
    </nav>
  );
};

export default Nav;
