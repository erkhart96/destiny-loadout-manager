import React from "react";
import { Modal, Box, Typography, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useContext } from "react";
import { StateContext } from "../context/StateContext";

function ItemModal({ currentItem, setOpen, open }) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "rgba(105,105,125,0.92)",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const { loadout, setLoadout } = useContext(StateContext);

  const handleAddToLoadout = (item) => {
    setLoadout({
      ...loadout,
      items: [
        ...loadout.items,
        {
          instance: item.itemInstance,
          hash: item.itemHash,
          name: item.name,
          image: item.icon,
          itemType: item.itemType,
        },
      ],
    });
    setOpen(false);
  };

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div style={{ display: "flex" }}>
          <div>
            <img src={`https://bungie.net/${currentItem.icon}`} />
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{ color: "white" }}
            >
              {currentItem.name}
            </Typography>
            <Typography id="modal-modal-description" sx={{ color: "white" }}>
              {currentItem.itemType}
            </Typography>
          </div>
          <IconButton
            sx={{ paddingBottom: "70px" }}
            onClick={() => handleAddToLoadout(currentItem)}
            disableRipple={true}
          >
            <AddIcon fontSize="large" color="success" />
            Add to Loadout
          </IconButton>
        </div>
        <Typography sx={{ mt: 2, color: "white" }}>
          {currentItem.flavorText}
        </Typography>
      </Box>
    </Modal>
  );
}

export default ItemModal;
