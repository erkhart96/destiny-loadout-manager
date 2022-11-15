import React, { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { StateContext } from "../context/StateContext";
import { inventoryMapper } from "../utils/InventoryMapper";
import LoginButton from "./LoginButton";
import "../App.css";
import SaveLoadout from "./SaveLoadout";
import RenderLoadout from "./RenderLoadout";
import ItemModal from "./ItemModal";

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
    loadout,
    setLoadout,
    open,
    setOpen,
  } = useContext(StateContext);
  const [userProfile, setUserProfile] = useState();
  const [apiMembershipId, setApiMembershipId] = useState("");

  useEffect(() => {
    fetch("/users")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUser(data[0]);
        fetchUserProfile(data[0]);
        setApiMembershipId(data[0].api_membership_id);
      });
  }, []);

  useEffect(() => {
    if (
      userProfile &&
      userProfile.characters &&
      !hunter.key &&
      !titan.key &&
      !warlock.key
    ) {
      setHunter({
        ...hunter,
        key: Object.keys(userProfile.characters.data)[0],
      });
      setWarlock({
        ...warlock,
        key: Object.keys(userProfile.characters.data)[1],
      });
      setTitan({
        ...titan,
        key: Object.keys(userProfile.characters.data)[2],
      });

      console.log("Characters", userProfile?.characters);
    }
  }, [userProfile]);

  useEffect(() => {
    if (
      hunter.key &&
      warlock.key &&
      titan.key &&
      !hunter.inventory &&
      !titan.inventory &&
      !warlock.inventory
    ) {
      fetchHunterNotEquippedInventory();
      fetchWarlockNotEquippedInventory();
      fetchTitanNotEquippedInventory();
    }

    if (
      userProfile &&
      userProfile.characterEquipment &&
      !hunter.equipped &&
      !warlock.equipped &&
      !titan.equipped
    ) {
      Object.values(userProfile?.characterEquipment?.data).map((char, i) => {
        inventoryMapper(char.items).then((values) => {
          if (i === 0) setHunter({ ...hunter, equipped: values });
          if (i === 1) setWarlock({ ...warlock, equipped: values });
          if (i === 2) setTitan({ ...titan, equipped: values });
        });
      });
    }
  }, [hunter, warlock, titan, userProfile]);

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
      });
  }

  //////////////// Console, the Log - Gatekeeper of All Data ///////////////////
  console.log(hunter.key);
  // console.log(hunterEquippedInstances);

  ////////// FETCHING CHARACTER NOT EQUIPPED INVENTORIES //////////

  async function fetchHunterNotEquippedInventory() {
    fetch(
      `https://www.bungie.net/Platform/Destiny2/2/Profile/${apiMembershipId}/Character/${hunter.key}/?components=201`,
      {
        headers: {
          "x-api-key": "68015959b1c44de5b97feb8911f11167",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        let itemsAry = [];
        console.log(data.Response.inventory.data.items.length);
        data.Response.inventory.data.items.map((item) => {
          itemsAry.push(item);
        });
        if (itemsAry.length === data.Response.inventory.data.items.length) {
          inventoryMapper(itemsAry).then((values) => {
            setHunter({ ...hunter, inventory: values });
          });
        }
      });
  }

  console.log(hunter.equipped);

  const handleAddToLoadout = (item) => {
    setLoadout({
      ...loadout,
      items: [
        ...loadout.items,
        {
          instance: item.itemInstance,
          hash: item.itemHash,
          name: item.name,
          image: item.icon,
          itemType: item.itemType,
        },
      ],
    });
  };

  async function fetchWarlockNotEquippedInventory() {
    fetch(
      `https://www.bungie.net/Platform/Destiny2/2/Profile/${apiMembershipId}/Character/${warlock.key}/?components=201`,
      {
        headers: {
          "x-api-key": "68015959b1c44de5b97feb8911f11167",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        let itemsAry = [];
        console.log(data.Response.inventory.data.items.length);
        data.Response.inventory.data.items.map((item) => {
          itemsAry.push(item);
        });
        if (itemsAry.length === data.Response.inventory.data.items.length) {
          inventoryMapper(itemsAry).then((values) => {
            setWarlock({ ...warlock, inventory: values });
          });
        }
      });
  }

  async function fetchTitanNotEquippedInventory() {
    fetch(
      `https://www.bungie.net/Platform/Destiny2/2/Profile/${apiMembershipId}/Character/${titan.key}/?components=201`,
      {
        headers: {
          "x-api-key": "68015959b1c44de5b97feb8911f11167",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        let itemsAry = [];
        console.log(data.Response.inventory.data.items.length);
        data.Response.inventory.data.items.map((item) => {
          itemsAry.push(item);
        });
        if (itemsAry.length === data.Response.inventory.data.items.length) {
          inventoryMapper(itemsAry).then((values) => {
            setTitan({ ...titan, inventory: values });
          });
        }
      });
  }

  const onClickTest = () => {
    setOpen(true);
  };
  ////////// MAPPING OVER NOT EQUIPPED INVENTORIES //////////

  const hunterNotEquippedInventory = hunter?.inventory?.map((item) => {
    <ItemModal item={item} setOpen={setOpen} open={open} />;
    return (
      <div className="itemMapContainer">
        <div>
          <img
            className="itemImg"
            src={`https://bungie.net${item.icon}`}
            alt={item.name}
            onClick={onClickTest}
          />
          {open ? (
            <ItemModal item={item} setOpen={setOpen} open={open} />
          ) : null}
        </div>
        {/* <div>
          <h4>{item.name}</h4>
          <h5>{item.itemType}</h5>
          <button onClick={() => handleAddToLoadout(item)}>
            Add to Loadout
          </button>
        </div> */}
      </div>
    );
  });

  const warlockNotEquippedInventory = warlock?.inventory?.map((item) => {
    return (
      <div className="itemMapContainer">
        <div>
          <img
            className="itemImg"
            src={`https://bungie.net${item.icon}`}
            alt={item.name}
          />
        </div>
        {/* <div>
          <h4>{item.name}</h4>
          <h5>{item.itemType}</h5>
          <button onClick={() => handleAddToLoadout(item)}>
            Add to Loadout
          </button>
        </div> */}
      </div>
    );
  });

  const titanNotEquippedInventory = titan?.inventory?.map((item) => {
    return (
      <div className="itemMapContainer">
        <div>
          <img
            className="itemImg"
            src={`https://bungie.net${item.icon}`}
            alt={item.name}
          />
        </div>
        {/* <div>
          <h4>{item.name}</h4>
          <h5>{item.itemType}</h5>
          <button onClick={() => handleAddToLoadout(item)}>
            Add to Loadout
          </button>
        </div> */}
      </div>
    );
  });

  ////////// MAPPING OVER EQUIPPED INVENTORIES //////////

  const hunterInventory = hunter.equipped?.map((item) => {
    return (
      <div className="itemMapContainer">
        <div>
          <img
            className="itemImg"
            src={`https://bungie.net${item.icon}`}
            alt={item.name}
          />
        </div>
        <div>
          <h4>{item.name}</h4>
          <h5>{item.itemType}</h5>
          <button onClick={() => handleAddToLoadout(item)}>
            Add to Loadout
          </button>
        </div>
      </div>
    );
  });

  const warlockInventory = warlock.equipped?.map((item) => {
    return (
      <div className="itemMapContainer">
        <div>
          <img
            className="itemImg"
            src={`https://bungie.net${item.icon}`}
            alt={item.name}
          />
        </div>
        <div>
          <h4>{item.name}</h4>
          <h5>{item.itemType}</h5>
          <button onClick={() => handleAddToLoadout(item)}>
            Add to Loadout
          </button>
        </div>
      </div>
    );
  });

  const titanInventory = titan.equipped?.map((item) => {
    return (
      <div className="itemMapContainer">
        <div>
          <img
            className="itemImg"
            src={`https://bungie.net${item.icon}`}
            alt={item.name}
          />
        </div>
        <div>
          <h4>{item.name}</h4>
          <h5>{item.itemType}</h5>
          <button onClick={() => handleAddToLoadout(item)}>
            Add to Loadout
          </button>
        </div>
      </div>
    );
  });

  const clearLoadout = () => {
    setLoadout({
      items: [],
    });
  };

  ////////// RENDERING EQUIPPED AND NOT EQUIPPED INVENTORIES //////////
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
      <SaveLoadout loadout={loadout} user={user} />
      <button onClick={clearLoadout}>Clear Loadout</button>
      {loadout.items.length >= 1 ? <RenderLoadout /> : null}
      <div className="itemsContainer">
        <div className="notEquippedInv">
          <h2>Hunter Inventory</h2>
          {hunterNotEquippedInventory}
        </div>
        <div>
          <h2>Equipped - Hunter</h2>
          {hunterInventory}
        </div>
        <div className="notEquippedInv">
          <h2>Warlock Inventory</h2>
          {warlockNotEquippedInventory}
        </div>
        <div>
          <h2>Equipped - Warlock</h2>
          {warlockInventory}
        </div>
        <div className="notEquippedInv">
          <h2>Titan Inventory</h2>
          {titanNotEquippedInventory}
        </div>
        <div>
          <h2>Equipped - Titan</h2>
          {titanInventory}
        </div>
      </div>
    </div>
  );
}

export default Home;
