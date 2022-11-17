import React, { useContext, useState } from "react";
import { StateContext } from "../context/StateContext";
import { useEffect } from "react";
import Item from "./Item";
import { IconButton } from "@mui/material";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Tooltip } from "@mui/material";

const Loadouts = () => {
  const { loadout, hunter, setLoadout } = useContext(StateContext);

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

  // const handleAddToLoadout = (item) => {
  //   setLoadout({
  //     ...loadout,
  //     items: [
  //       ...loadout.items,
  //       {
  //         instance: item.item_instance,
  //         hash: item.item_hash,
  //         name: item.name,
  //         image: item.icon,
  //         itemType: item.itemType,
  //       },
  //     ],
  //   });
  // };
  console.log(loadout);

  const handleDelete = (id) => {
    loadouts.map((item) => {
      if (id === item.id) {
        fetch(`/loadouts/${item.id}`, {
          method: "DELETE",
        }).then((res) => {
          if (res.ok) {
            window.location.reload(false);
            console.log("Delete successful!");
          }
        });
      }
    });
  };

  return (
    <div className="renderLoadoutScreen">
      {loadouts?.length ? (
        loadouts.map((loadout) => (
          <div key={loadout.id} className="renderLoadoutContent">
            <h2 className="renderLoadoutName">{loadout?.name}</h2>
            <div className="renderLoadoutButtons">
              <Tooltip title="Equip Loadout">
                <IconButton onClick={equipLoadout} className="loadoutButton">
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
        <></>
      )}
    </div>
  );
};

export default Loadouts;
