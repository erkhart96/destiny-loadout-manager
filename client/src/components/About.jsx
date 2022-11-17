import React from "react";
import ghost from "../images/ghost.png";
import devise from "../images/devise.png";

function About() {
  return (
    <div>
      <div className="aboutDiv">
        <div>
          <img className="aboutLogo" src={ghost} />
        </div>
        <h1 className="aboutTitle">Destiny Loadout Manager</h1>
        <h3 style={{ color: "white" }}>
          A loadout and inventory manager for the game Destiny 2.
        </h3>
        <h2 style={{ color: "white" }}>Created By: Ben Erkhart</h2>
        <a href="https://github.com/erkhart96" style={{ color: "white" }}>
          GitHub
        </a>
        <br></br>
        <a
          href="https://linkedin.com/in/ben-erkhart"
          style={{ color: "white" }}
        >
          LinkedIn
        </a>
        <h2></h2>
      </div>
      <br></br>
      <h2 style={{ color: "white", marginLeft: "250px" }}>Tech Used:</h2>
      <div style={{ display: "flex", marginLeft: "250px" }}>
        <img
          src="https://www.datocms-assets.com/14946/1638186862-reactjs.png"
          style={{ height: "200px", width: "400px" }}
        ></img>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Ruby_On_Rails_Logo.svg/1200px-Ruby_On_Rails_Logo.svg.png"
          style={{ height: "200px", width: "400px", marginLeft: "20px" }}
        ></img>
        <img
          src={devise}
          style={{ height: "200px", width: "400px", marginLeft: "20px" }}
        ></img>
        <img
          src="https://miro.medium.com/max/800/1*PY24xlr4TpOkXW04HUoqrQ.jpeg"
          style={{ height: "200px", width: "400px", marginLeft: "20px" }}
        ></img>
        <img
          src="https://miro.medium.com/max/750/1*WI30JRDUNGuDDKWXrIvu7A.jpeg"
          style={{ height: "200px", width: "400px", marginLeft: "20px" }}
        ></img>
      </div>
    </div>
  );
}

export default About;
