import React from "react";
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import LoginButton from "./LoginButton";

function Home() {
  useEffect(() => {
    fetch("/users")
      .then((res) => res.json())
      .then((data) => console.log(data));
  }, []);

  return (
    <div className="container">
      <h4>Destiny Loadout Manager</h4>
      <br></br>
      <Routes>
        <Route path="/" element={<LoginButton />} />
      </Routes>
    </div>
  );
}

export default Home;
