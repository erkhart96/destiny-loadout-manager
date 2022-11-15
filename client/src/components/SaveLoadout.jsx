import React from "react";
import { useContext } from "react";
import { StateContext } from "../context/StateContext";

function SaveLoadout() {
  const { loadout, user, loadoutName } = useContext(StateContext);
  const saveLoadout = () => {
    fetch("/loadouts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: loadoutName,
        uid: user.uid,
        items: loadout.items,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return <button onClick={saveLoadout}>Save Loadout</button>;
}

export default SaveLoadout;
