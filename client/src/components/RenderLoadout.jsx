import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { StateContext } from "../context/StateContext";
import { inventoryMapper } from "../utils/InventoryMapper";
import { resolvePromiseAry } from "../utils/ResolvePromiseAry";
import TextField from "@mui/material/TextField";

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
    <div className="renderLoadoutDiv">
      <div className="loadoutInputField">
        <TextField
          id="filled-basic"
          label="Enter a loadout name..."
          onChange={handleChange}
          variant="outlined"
          style={{ width: "474px", marginTop: "20px" }}
        />
      </div>
      {loadoutAry.map((item) => (
        <div className="itemMapContainer">
          <img
            src={`https://bungie.net${item.icon}`}
            alt={item.name}
            className="itemImg"
          />
          <p>{item.name}</p>
        </div>
      ))}
    </div>
  );
}

export default RenderLoadout;
