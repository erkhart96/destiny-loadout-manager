import React, { useContext, useEffect } from "react";
import { StateContext } from "../context/StateContext";
import { Routes, Route } from "react-router-dom";
import LoginButton from "./LoginButton";
import { Link } from "react-router-dom";

const Nav = () => {
  const { user, setUser } = useContext(StateContext);
  useEffect(() => {
    fetch("/users")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUser(data[0]);
      });
  }, []);

  return (
    <div>
      <h4>Destiny Loadout Manager</h4>
      <h4>Logged in as: {user ? user.display_name : "None"}</h4>
      <br></br>
      <Routes>
        <Route
          path="/"
          element={<LoginButton user={user} setUser={setUser} />}
        />
      </Routes>
      <nav>
        <Link to="/loadouts">Loadouts</Link>
        <Link to="/home">Home</Link>
      </nav>
    </div>
  );
};

export default Nav;
