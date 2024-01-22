import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  gap: "10px",
};

export default function PotionModal({item}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <button
        onClick={handleOpen}
        className="bg-red-500 text-white px-4 py-2 rounded-md mt-2"
      >
        Details
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <img
              src={item.attributes.image}
              alt={item.attributes.name}
              className="w-full h-64 object-cover"
            />
            <h2 className="text-xl font-bold">{item.attributes.name ? item.attributes.name : 'N/A'}</h2>
            <p className="text-sm">Description: {item.attributes.description ? item.attributes.description : 'N/A'}</p>
            <p className="text-sm">Difficulty: {item.attributes.difficulty ? item.attributes.difficulty : 'N/A'}</p>
            <p className="text-sm">
              Characteristic: {item.attributes.characteristics ? item.attributes.characteristics : 'N/A'}
            </p>
            <p>Effect: {item.attributes.effect ? item.attributes.effect : 'N/A'}</p>
            <p>Ingridients: {item.attributes.ingridients ? item.attributes.ingridients : 'N/A'}</p>
            <p>Inventors: {item.attributes.inventors ? item.attributes.inventors : 'N/A'}</p>
            <p>Manufacturers: {item.attributes.manufacturers ? item.attributes.manufacturers : 'N/A'}</p>
            <p>Side Effects: {item.attributes.side_effects ? item.attributes.side_effects : 'N/A'}</p>
            <a 
            href={item.attributes.wiki}
            target="_blank"
            className="bg-red-500 text-white px-4 py-2 rounded-md mt-2">
              Learn More
            </a>
        </Box>
      </Modal>
    </div>
  );
}
