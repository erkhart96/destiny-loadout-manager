import React from "react";
import { useContext, useState, useEffect } from "react";
import { StateContext } from "../context/StateContext";
import { inventoryMapper } from "../utils/InventoryMapper";
import ItemModal from "./ItemModal";
import SaveLoadout from "./SaveLoadout";
import RenderLoadout from "./RenderLoadout";

function Titan() {
  const {
    user,
    setUser,
    titan,
    setTitan,
    loadout,
    setLoadout,
    open,
    setOpen,
    apiMembershipId,
    setApiMembershipId,
  } = useContext(StateContext);

  const [userProfile, setUserProfile] = useState();

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
    if (userProfile && userProfile.characters && !titan.key) {
      setTitan({
        ...titan,
        key: Object.keys(userProfile.characters.data)[2],
      });

      console.log("Characters", userProfile?.characters);
    }
  }, [userProfile]);

  useEffect(() => {
    if (titan.key && !titan.inventory) {
      fetchTitanNotEquippedInventory();
    }

    if (userProfile && userProfile.characterEquipment && !titan.equipped) {
      Object.values(userProfile?.characterEquipment?.data).map((char, i) => {
        inventoryMapper(char.items).then((values) => {
          if (i === 2) setTitan({ ...titan, equipped: values });
        });
      });
    }
  }, [titan, userProfile]);

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

  const onClickTest = () => {
    setOpen(true);
  };

  const clearLoadout = () => {
    setLoadout({
      items: [],
    });
  };

  ////////// FETCHING CHARACTER NOT EQUIPPED INVENTORIES //////////

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

  ////////// MAPPING OVER NOT EQUIPPED INVENTORIES //////////

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

  ////////// RENDERING EQUIPPED AND NOT EQUIPPED INVENTORIES //////////

  return (
    <div className="container">
      <SaveLoadout loadout={loadout} user={user} />
      <button onClick={clearLoadout}>Clear Loadout</button>
      {loadout.items.length >= 1 ? <RenderLoadout /> : null}
      <div className="itemsContainer">
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

export default Titan;
