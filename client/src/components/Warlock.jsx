import React from "react";
import { useContext, useState, useEffect } from "react";
import { StateContext } from "../context/StateContext";
import { inventoryMapper } from "../utils/InventoryMapper";
import ItemModal from "./ItemModal";
import SaveLoadout from "./SaveLoadout";
import RenderLoadout from "./RenderLoadout";
import WarlockEmblem from "./WarlockEmblem";

function Warlock() {
  const {
    user,
    setUser,
    warlock,
    setWarlock,
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
    if (userProfile && userProfile.characters && !warlock.key) {
      setWarlock({
        ...warlock,
        key: Object.keys(userProfile.characters.data)[1],
      });

      console.log("Characters", userProfile?.characters);
    }
  }, [userProfile]);

  useEffect(() => {
    if (warlock.key && !warlock.inventory) {
      fetchWarlockNotEquippedInventory();
    }

    if (userProfile && userProfile.characterEquipment && !warlock.equipped) {
      Object.values(userProfile?.characterEquipment?.data).map((char, i) => {
        inventoryMapper(char.items).then((values) => {
          if (i === 1) setWarlock({ ...warlock, equipped: values });
        });
      });
    }
  }, [warlock, userProfile]);

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

  const clearLoadout = () => {
    setLoadout({
      items: [],
    });
  };

  const onClickTest = () => {
    setOpen(true);
  };

  ////////// FETCHING CHARACTER NOT EQUIPPED INVENTORIES //////////

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

  ////////// MAPPING OVER NOT EQUIPPED INVENTORIES //////////

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

  ////////// MAPPING OVER EQUIPPED INVENTORIES //////////

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

  ////////// RENDERING EQUIPPED AND NOT EQUIPPED INVENTORIES //////////

  return (
    <div className="hunterContainer">
      <div className="emblemContainer">
        {loadout.items.length >= 1 ? <RenderLoadout /> : <WarlockEmblem />}
        <div className="column">
          <h2>Inventory</h2>
          <div className="notEquippedInv">{warlockNotEquippedInventory}</div>
        </div>
        <div className="column">
          <h2>Equipped</h2>
          <div className="equippedInv">{warlockInventory}</div>
        </div>
      </div>
      <button onClick={clearLoadout}>Clear Loadout</button>
    </div>
  );
}

export default Warlock;
