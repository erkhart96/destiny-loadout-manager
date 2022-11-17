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
  const { user, setUser, userProfile } = useContext(StateContext);
  useEffect(() => {
    fetch("/users")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUser(data[0]);
      });
  }, []);

  useEffect(() => {
    fetch(
      "https://bungie.net/Platform/Destiny2/2/Profile/4611686018442264001/LinkedProfiles",
      {
        headers: {
          "x-api-key": "68015959b1c44de5b97feb8911f11167",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  }, []);

  //////////////// Console, the Log - Gatekeeper of All Data ///////////////////
  // console.log("test");

  return (
    <div className="container">
      <div className="emblemContainer">
        <HunterEmblem />
        <WarlockEmblem />
        <TitanEmblem />
      </div>
    </div>
  );
}

export default Home;
