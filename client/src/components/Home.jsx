import React, { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { StateContext } from "../context/StateContext";
import { inventoryMapper } from "../utils/InventoryMapper";
import LoginButton from "./LoginButton";
import "../App.css";

function Home() {
  const {
    user,
    setUser,
    titan,
    setTitan,
    warlock,
    setWarlock,
    hunter,
    setHunter,
  } = useContext(StateContext);
  const [userProfile, setUserProfile] = useState();
  let navigate = useNavigate();

  useEffect(() => {
    fetch("/users")
      .then((res) => res.json())
      .then((data) => {
        setUser(data[0]);
        fetchUserProfile(data[0]);
      });
  }, []);

  async function fetchUserProfile(data) {
    const apiMembershipId = data.api_membership_id;
    fetch(
      `https://www.bungie.net/Platform/Destiny2/2/Profile/${apiMembershipId}/?components=200,205`,
      {
        headers: {
          "x-api-key": "68015959b1c44de5b97feb8911f11167",
        },
      }
    )
      .then((res) => res.json())
      .then(({ Response }) => {
        setUserProfile(Response);
        console.log(Response);

        Object.values(Response.characterEquipment.data).map((char, i) => {
          inventoryMapper(char.items).then((values) => {
            if (i === 0) setHunter({ inventory: values });
            if (i === 1) setWarlock({ inventory: values });
            if (i === 2) setTitan({ inventory: values });
          });
        });
      });
  }


  console.log(hunter);
  const hunterInventory = hunter.inventory?.map((item) => {
    return (
      <div className="itemMapContainer">
        <div>
          <img src={`https://bungie.net${item.icon}`} alt={item.name} />
        </div>
        <div>
          <h4>{item.name}</h4>
          <h5>{item.itemType}</h5>
        </div>
      </div>
    );
  });

  const warlockInventory = warlock.inventory?.map((item) => {
    return (
      <div className="itemMapContainer">
        <div>
          <img src={`https://bungie.net${item.icon}`} alt={item.name} />
        </div>
        <div>
          <h4>{item.name}</h4>
          <h5>{item.itemType}</h5>
        </div>
      </div>
    );
  });

  const titanInventory = titan.inventory?.map((item) => {
    return (
      <div className="itemMapContainer">
        <div>
          <img src={`https://bungie.net${item.icon}`} alt={item.name} />
        </div>
        <div>
          <h4>{item.name}</h4>
          <h5>{item.itemType}</h5>
        </div>
      </div>
    );
  });

  return (
    <div className="container">
      <h4>Destiny Loadout Manager</h4>
      <h4>Logged in as: {user ? user.display_name : "None"}</h4>
      <br></br>
      <Routes>
        <Route
          path="/"
          element={<LoginButton user={user} setUser={setUser} />}
        />
      </Routes>
      <div className="itemsContainer">
        <div>
          <h2>Hunter</h2>
          {hunterInventory}
        </div>
        <div>
          <h2>Warlock</h2>
          {warlockInventory}
        </div>
        <div>
          <h2>Titan</h2>
          {titanInventory}
        </div>
      </div>
    </div>
  );
}

export default Home;
