import React, { useContext } from "react";
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { StateContext } from "../context/StateContext";
import LoginButton from "./LoginButton";
import { Link } from "react-router-dom";
import "../App.css";
import HunterEmblem from "./HunterEmblem";
import WarlockEmblem from "./WarlockEmblem";
import TitanEmblem from "./TitanEmblem";

function Home() {
  const { user, setUser } =
    useContext(StateContext);
  useEffect(() => {
    fetch("/users")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUser(data[0]);
      });
  }, []);

  //////////////// Console, the Log - Gatekeeper of All Data ///////////////////
  console.log("test");

  return (
    <div className="container">
      <nav>
        <Link to="/hunter">Hunter</Link>
        <Link to="/warlock">Warlock</Link>
        <Link to="/titan">Titan</Link>
      </nav>
      <div className="emblemContainer">
        <HunterEmblem />
        <WarlockEmblem />
        <TitanEmblem />
      </div>
    </div>
  );
}

export default Home;
