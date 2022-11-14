import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { StateContext } from "../context/StateContext";
import { inventoryMapper } from "../utils/InventoryMapper";
import { resolvePromiseAry } from "../utils/ResolvePromiseAry";

function RenderLoadout() {
  const { loadout } = useContext(StateContext);
  const [loadoutAry, setLoadoutAry] = useState([]);
  const promiseAry = loadout.items.map(async (item) => {
    const values = await inventoryMapper(item.hash);
    return values;
  });

  useEffect(() => {
    (async function () {
      setLoadoutAry(await resolvePromiseAry(promiseAry));
    })();
  }, [loadout]);

  return (
    <div>
      {loadoutAry.map((item) => (
        <div>
          <img src={`https://bungie.net${item.icon}`} alt={item.name} />
          <p>{item.name}</p>
        </div>
      ))}
    </div>
  );
}

export default RenderLoadout;
