import React from "react";

const Item = ({ name, itemType, image, button }) => {
  return (
    <div className="itemMapContainer">
      <div>
        <img src={`https://bungie.net${image}`} alt={name} />
      </div>
      <div>
        <h4>{name}</h4>
        <h5>{itemType}</h5>
        {button && button}
      </div>
    </div>
  );
};

export default Item;
