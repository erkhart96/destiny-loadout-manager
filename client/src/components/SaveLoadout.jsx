import React from "react";
import { useContext } from "react";
import { StateContext } from "../context/StateContext";
import { useNavigate } from "react-router-dom";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { Tooltip } from "@mui/material";
import { IconButton } from "@mui/material";

function SaveLoadout() {
  const { loadout, user, loadoutName } = useContext(StateContext);

  let navigate = useNavigate();

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

  return (
    <div>
      <Tooltip title="Save Loadout">
        <IconButton onClick={saveLoadout} sx={{ paddingTop: "30px" }}>
          <CheckBoxIcon fontSize="large" color="success" />
        </IconButton>
      </Tooltip>
    </div>
  );
}

export default SaveLoadout;
