import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav>
      <Link to="/loadouts">Loadouts</Link>
      <Link to="/home">Home</Link>
    </nav>
  );
};

export default Nav;
