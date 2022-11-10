import React, { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { StateContext } from "../context/StateContext";
import { inventoryMapper } from "../utils/InventoryMapper";
import LoginButton from "./LoginButton";
import "../App.css";
import SaveLoadout from "./SaveLoadout";

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
  } = useContext(StateContext);
  const [userProfile, setUserProfile] = useState();
  const [apiMembershipId, setApiMembershipId] = useState("");
  const [hunterKeys, setHunterKeys] = useState("");
  const [hunterNotEquipped, setHunterNotEquipped] = useState();
  const [warlockKeys, setWarlockKeys] = useState("");
  const [warlockNotEquipped, setWarlockNotEquipped] = useState();
  const [titanKeys, setTitanKeys] = useState("");
  const [titanNotEquipped, setTitanNotEquipped] = useState();
  let navigate = useNavigate();

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
        // console.log(Response);

        if (Response) {
          Object.values(Response?.characterEquipment?.data).map((char, i) => {
            inventoryMapper(char.items).then((values) => {
              if (i === 0) setHunter({ inventory: values });
              if (i === 1) setWarlock({ inventory: values });
              if (i === 2) setTitan({ inventory: values });
            });
          });
        }
        retrieveHunterKey();
        retrieveWarlockKey();
        retrieveTitanKey();
        fetchHunterNotEquippedInventory();
        fetchWarlockNotEquippedInventory();
        fetchTitanNotEquippedInventory();
      });
  }

  ////////// RETRIEVING CHARACTER KEYS //////////

  async function retrieveHunterKey() {
    if (userProfile) {
      setHunterKeys(Object.keys(userProfile.characters.data)[0]);
    } else {
      setHunterKeys("Hunter keys not loaded...");
    }
  }

  async function retrieveWarlockKey() {
    if (userProfile) {
      setWarlockKeys(Object.keys(userProfile.characters.data)[1]);
    } else {
      setWarlockKeys("Warlock keys not loaded...");
    }
  }

  async function retrieveTitanKey() {
    if (userProfile) {
      setTitanKeys(Object.keys(userProfile.characters.data)[2]);
    } else {
      setTitanKeys("Titan keys not loaded...");
    }
  }
  // console.log(hunterKeys);
  // console.log(hunterEquippedInstances);

  ////////// FETCHING CHARACTER NOT EQUIPPED INVENTORIES //////////

  async function fetchHunterNotEquippedInventory() {
    fetch(
      `https://www.bungie.net/Platform/Destiny2/2/Profile/${apiMembershipId}/Character/${hunterKeys}/?components=201`,
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
            setHunterNotEquipped(values);
          });
        }
      });
  }

  const handleAddToLoadout = (item) => {
    setLoadout({
      ...loadout,
      items: [
        ...loadout.items,
        { instance: item.itemInstance, hash: item.itemHash },
      ],
    });
  };

  async function fetchWarlockNotEquippedInventory() {
    fetch(
      `https://www.bungie.net/Platform/Destiny2/2/Profile/${apiMembershipId}/Character/${warlockKeys}/?components=201`,
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
            setWarlockNotEquipped(values);
          });
        }
      });
  }

  async function fetchTitanNotEquippedInventory() {
    fetch(
      `https://www.bungie.net/Platform/Destiny2/2/Profile/${apiMembershipId}/Character/${titanKeys}/?components=201`,
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
            setTitanNotEquipped(values);
          });
        }
      });
  }

  ////////// MAPPING OVER NOT EQUIPPED INVENTORIES //////////

  const hunterNotEquippedInventory = hunterNotEquipped?.map((item) => {
    return (
      <div className="itemMapContainer">
        <div>
          <img src={`https://bungie.net${item.icon}`} alt={item.name} />
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

  const warlockNotEquippedInventory = warlockNotEquipped?.map((item) => {
    return (
      <div className="itemMapContainer">
        <div>
          <img src={`https://bungie.net${item.icon}`} alt={item.name} />
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

  const titanNotEquippedInventory = titanNotEquipped?.map((item) => {
    return (
      <div className="itemMapContainer">
        <div>
          <img src={`https://bungie.net${item.icon}`} alt={item.name} />
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

  ////////// MAPPING OVER EQUIPPED INVENTORIES //////////

  const hunterInventory = hunter.inventory?.map((item) => {
    return (
      <div className="itemMapContainer">
        <div>
          <img src={`https://bungie.net${item.icon}`} alt={item.name} />
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

  const warlockInventory = warlock.inventory?.map((item) => {
    return (
      <div className="itemMapContainer">
        <div>
          <img src={`https://bungie.net${item.icon}`} alt={item.name} />
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

  const titanInventory = titan.inventory?.map((item) => {
    return (
      <div className="itemMapContainer">
        <div>
          <img src={`https://bungie.net${item.icon}`} alt={item.name} />
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
    setLoadout([]);
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
      <div className="itemsContainer">
        <div>
          <h2>Hunter Inventory</h2>
          {hunterNotEquippedInventory}
        </div>
        <div>
          <h2>Equipped - Hunter</h2>
          {hunterInventory}
        </div>
        <div>
          <h2>Warlock Inventory</h2>
          {warlockNotEquippedInventory}
        </div>
        <div>
          <h2>Equipped - Warlock</h2>
          {warlockInventory}
        </div>
        <div>
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
