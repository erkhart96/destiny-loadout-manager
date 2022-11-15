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

  const { setLoadoutName } = useContext(StateContext);

  useEffect(() => {
    (async function () {
      setLoadoutAry(await resolvePromiseAry(promiseAry));
    })();
  }, [loadout]);

  const handleChange = (e) => {
    setLoadoutName(e.target.value);
  };

  return (
    <>
      <div>
        <form>
          <label>
            Loadout Name:
            <input type="text" name="name" onChange={handleChange} />
          </label>
        </form>
      </div>
      <div>
        {loadoutAry.map((item) => (
          <div>
            <img src={`https://bungie.net${item.icon}`} alt={item.name} />
            <p>{item.name}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default RenderLoadout;
