import React from "react";
import { useContext, useState, useEffect } from "react";
import { StateContext } from "../context/StateContext";
import { inventoryMapper } from "../utils/InventoryMapper";
import ItemModal from "./ItemModal";
import SaveLoadout from "./SaveLoadout";
import RenderLoadout from "./RenderLoadout";

function Hunter() {
  const {
    user,
    setUser,
    hunter,
    setHunter,
    loadout,
    setLoadout,
    open,
    setOpen,
    apiMembershipId,
    setApiMembershipId,
    userProfile,
    setUserProfile,
  } = useContext(StateContext);

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
    if (userProfile && userProfile.characters && !hunter.key) {
      setHunter({
        ...hunter,
        key: Object.keys(userProfile.characters.data)[0],
      });
      console.log("Characters", userProfile?.characters);
    }
  }, [userProfile]);

  useEffect(() => {
    if (hunter.key && !hunter.inventory) {
      fetchHunterNotEquippedInventory();
    }

    if (userProfile && userProfile.characterEquipment && !hunter.equipped) {
      Object.values(userProfile?.characterEquipment?.data).map((char, i) => {
        inventoryMapper(char.items).then((values) => {
          if (i === 0) setHunter({ ...hunter, equipped: values });
        });
      });
    }
  }, [hunter, userProfile]);

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

  console.log(hunter);
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

  const clearLoadout = () => {
    setLoadout({
      items: [],
    });
  };

  ////////// RENDERING EQUIPPED AND NOT EQUIPPED INVENTORIES //////////

  return (
    <div className="container">
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
      </div>
    </div>
  );
}

export default Hunter;
