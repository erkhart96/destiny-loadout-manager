import React from "react";
import { Modal, Box, Typography } from "@mui/material";

function ItemModal({ item, setOpen, open }) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  console.log(item);

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {item.name}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {item.itemType}
        </Typography>
      </Box>
    </Modal>
  );
}

export default ItemModal;
