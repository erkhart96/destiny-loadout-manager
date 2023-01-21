import React, { useContext } from "react";
import { useEffect } from "react";
import { StateContext } from "../context/StateContext";
import "../App.css";
import HunterEmblem from "./HunterEmblem";
import WarlockEmblem from "./WarlockEmblem";
import TitanEmblem from "./TitanEmblem";
import { useState } from "react";
import LoadingScreen from "./LoadingScreen";

function Home() {
  const { setUser, userProfile } = useContext(StateContext);
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
