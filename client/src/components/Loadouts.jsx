import React, { useContext, useState } from "react";
import { StateContext } from "../context/StateContext";
import { useEffect } from "react";
import Item from "./Item";
import { Button, IconButton } from "@mui/material";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Loadouts = () => {
  const { hunter, loadout: loadoutContext } = useContext(StateContext);

  const [loadouts, setLoadouts] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    fetch("/loadouts")
      .then((res) => res.json())
      .then((data) => {
        setLoadouts(data);
      });
  }, []);

  const equipLoadout = (loadout) => {
    const items = loadoutContext.items.length
      ? loadoutContext.items
      : loadout.items;

    fetch("/equip", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        character: hunter.key || window.localStorage.getItem("key"),
        items: [...items],
      }),
    });
  };

  const handleDelete = (id) => {
    loadouts.map((item) => {
      if (id === item.id) {
        fetch(`/loadouts/${item.id}`, {
          method: "DELETE",
        }).then((res) => {
          if (res.ok) {
            window.location.reload(false);
          }
        });
      }
    });
  };

  const handleClick = () => {
    navigate("/home");
  };

  return (
    <div className="renderLoadoutScreen">
      {loadouts?.length ? (
        loadouts.map((loadout) => (
          <div key={loadout.id} className="renderLoadoutContent">
            <h2 className="renderLoadoutName">{loadout?.name}</h2>
            <div className="renderLoadoutButtons">
              <Tooltip title="Equip Loadout">
                <IconButton
                  onClick={() => equipLoadout(loadout)}
                  className="loadoutButton"
                >
                  <CheckBoxIcon fontSize="large" color="success" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete Loadout">
                <IconButton
                  onClick={() => handleDelete(loadout.id)}
                  className="loadoutButton"
                >
                  <DeleteForeverIcon fontSize="large" color="error" />
                </IconButton>
              </Tooltip>
            </div>
            {loadout.items.map((item) => (
              <div>
                <Item
                  name={item?.name}
                  image={item?.image}
                  itemType={item?.item_type}
                />
              </div>
            ))}
          </div>
        ))
      ) : (
        <div className="noLoadoutDiv">
          <h1>Loadouts you create will appear here...</h1>
          <Button
            variant="contained"
            color="success"
            style={{ textTransform: "none" }}
            onClick={handleClick}
          >
            Go To Character Select
          </Button>
        </div>
      )}
    </div>
  );
};

export default Loadouts;
