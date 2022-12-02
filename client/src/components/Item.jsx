import React from "react";

const Item = ({ name, itemType, image, button }) => {
  return (
    <div className="itemLoadoutTextContainer">
      <div className="itemLoadoutImgContainer">
        <img
          src={`https://bungie.net${image}`}
          alt={name}
          className="itemImg"
        />
      </div>
      <div>
        <div>
          <h4 className="loadoutItemName">{name}</h4>
        </div>
        <div>
          <h5 className="loadoutItemName">{itemType}</h5>
          {button && button}
        </div>
      </div>
    </div>
  );
};

export default Item;
