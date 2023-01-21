import React from "react";
import { useContext, useState, useEffect } from "react";
import { StateContext } from "../context/StateContext";
import { inventoryMapper } from "../utils/InventoryMapper";
import ItemModal from "./ItemModal";
import RenderLoadout from "./RenderLoadout";
import TitanEmblem from "./TitanEmblem";
import LoadingScreen from "./LoadingScreen";

function Titan() {
  const {
    setUser,
    titan,
    setTitan,
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
    if (titan.inventory && titan.equipped) {
      setLoading(false);
    }
  }, [titan]);

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
    if (userProfile && userProfile.characters && !titan.key) {
      setTitan({
        ...titan,
        key: Object.keys(userProfile.characters.data)[2],
      });
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
          "x-api-key": API_KEY,
        },
      }
    )
      .then((res) => res.json())
      .then(({ Response }) => {
        setUserProfile(Response);
      });
  }

  const handleCurrentItem = (item) => {
    setCurrentItem(item);
    setOpen(true);
  };

  ////////// FETCHING CHARACTER NOT EQUIPPED INVENTORIES //////////

  async function fetchTitanNotEquippedInventory() {
    fetch(
      `https://www.bungie.net/Platform/Destiny2/2/Profile/${apiMembershipId}/Character/${titan.key}/?components=201`,
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
            onClick={() => handleCurrentItem(item)}
          />
        </div>
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
            onClick={() => handleCurrentItem(item)}
          />
        </div>
        <div>
          <h4>{item.name}</h4>
          <h5>{item.itemType}</h5>
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
        {loadout.items.length >= 1 ? <RenderLoadout /> : <TitanEmblem />}
        <div className="column">
          <h2>Inventory</h2>
          <div className="notEquippedInv">{titanNotEquippedInventory}</div>
        </div>
        <div className="column">
          <h2>Equipped</h2>
          <div className="equippedInv">{titanInventory}</div>
        </div>
      </div>
    </div>
  );
}

export default Titan;
