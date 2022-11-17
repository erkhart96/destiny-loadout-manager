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
import { useState } from "react";
import LoadingScreen from "./LoadingScreen";

function Home() {
  const { user, setUser, userProfile } = useContext(StateContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userProfile) {
      setLoading(false);
    }
  }, [userProfile]);

  useEffect(() => {
    fetch("/users")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUser(data[0]);
      });
  }, []);

  //////////////// Console, the Log - Gatekeeper of All Data ///////////////////
  // console.log("test");

  return (
    <div className="container">
      {loading && <LoadingScreen />}
      <div className="emblemContainer">
        <HunterEmblem />
        <WarlockEmblem />
        <TitanEmblem />
      </div>
    </div>
  );
}

export default Home;
