import React from "react";
import { useContext, useState, useEffect } from "react";
import { StateContext } from "../context/StateContext";
import { inventoryMapper } from "../utils/InventoryMapper";
import ItemModal from "./ItemModal";
import RenderLoadout from "./RenderLoadout";
import HunterEmblem from "./HunterEmblem";
import LoadingScreen from "./LoadingScreen";
import { Tooltip } from "@mui/material";

function Hunter() {
  const {
    setUser,
    hunter,
    setHunter,
    loadout,
    open,
    setOpen,
    apiMembershipId,
    setApiMembershipId,
    userProfile,
    setUserProfile,
  } = useContext(StateContext);

  const [loading, setLoading] = useState(true);
  const [currentItem, setCurrentItem] = useState();
  const API_KEY = process.env.REACT_APP_API_KEY;

  const showModal = (
    <ItemModal open={open} setOpen={setOpen} currentItem={currentItem} />
  );

  useEffect(() => {
    if (hunter.inventory && hunter.equipped) {
      setLoading(false);
    }
  }, [hunter]);

  useEffect(() => {
    fetch("/users")
      .then((res) => res.json())
      .then((data) => {
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
      window.localStorage.setItem(
        "key",
        Object.keys(userProfile.characters.data)[0]
      );
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
          "x-api-key": API_KEY,
        },
      }
    )
      .then((res) => res.json())
      .then(({ Response }) => {
        setUserProfile(Response);
      });
  }

  ////////// FETCHING CHARACTER NOT EQUIPPED INVENTORIES //////////

  async function fetchHunterNotEquippedInventory() {
    fetch(
      `https://www.bungie.net/Platform/Destiny2/2/Profile/${apiMembershipId}/Character/${hunter.key}/?components=201`,
      {
        headers: {
          "x-api-key": API_KEY,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        let itemsAry = [];
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

  const handleCurrentItem = (item) => {
    setCurrentItem(item);
    setOpen(true);
  };

  ////////// MAPPING OVER NOT EQUIPPED INVENTORIES //////////

  const hunterNotEquippedInventory = hunter?.inventory?.map((item) => {
    return (
      <div className="itemMapContainer">
        <div>
          <Tooltip title={item.name}>
            <img
              className="itemImg"
              src={`https://bungie.net${item.icon}`}
              alt={item.name}
              onClick={() => handleCurrentItem(item)}
            />
          </Tooltip>
        </div>
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
            onClick={() => handleCurrentItem(item)}
          />
        </div>
        <div>
          <h4>{item.name}</h4>
        </div>
      </div>
    );
  });


  ////////// RENDERING EQUIPPED AND NOT EQUIPPED INVENTORIES //////////

  return (
    <div className="hunterContainer">
      {open ? showModal : null}
      {loading && <LoadingScreen />}
      <div className="emblemContainer">
        {loadout.items.length >= 1 ? <RenderLoadout /> : <HunterEmblem />}
        <div className="column">
          <h2>Inventory</h2>
          <div className="notEquippedInv">{hunterNotEquippedInventory}</div>
        </div>
        <div className="column">
          <h2>Equipped</h2>
          <div className="equippedInv">{hunterInventory}</div>
        </div>
      </div>
    </div>
  );
}

export default Hunter;
