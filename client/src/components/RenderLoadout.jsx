import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { StateContext } from "../context/StateContext";
import { inventoryMapper } from "../utils/InventoryMapper";

function RenderLoadout() {
  const [loadoutItems, setLoadoutItems] = useState([]);

  const { loadout } = useContext(StateContext);
  const test = loadout.items.map((item) => {
    inventoryMapper(item.hash).then((values) => {
      setLoadoutItems(values);
    });
  });
  return <div>RenderLoadout</div>;
}

export default RenderLoadout;
