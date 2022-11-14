import React, { useContext, useState } from "react";
import { StateContext } from "../context/StateContext";
import { useEffect } from "react";
import Item from "./Item";

const Loadouts = () => {
  const { loadout, hunter } = useContext(StateContext);

  const [loadouts, setLoadouts] = useState([]);
  useEffect(() => {
    fetch("/loadouts")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setLoadouts(data);
      });
  }, []);

  console.log(loadouts);

  const equipLoadout = () => {
    fetch("/equip", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        character: hunter.key,
        items: [...loadout.items],
      }),
    });
  };

  return (
    <div>
      {loadouts?.length ? (
        loadouts.map((loadout) => (
          <div key={loadout.id}>
            <p>{loadout?.name}</p>
            {loadout.items.map((item) => (
              <Item name={item?.name} image={item?.image} />
            ))}
            <button onClick={equipLoadout}>Equip</button>
          </div>
        ))
      ) : (
        <></>
      )}
    </div>
  );
};

export default Loadouts;
