import React from "react";
import ghost from "../images/ghost.png";
import "../Loading.css";

function LoadingScreen() {
  return (
    <div class="loadingContainer">
      <div class="bounce">
        <img src={ghost} />
      </div>
    </div>
  );
}

export default LoadingScreen;
