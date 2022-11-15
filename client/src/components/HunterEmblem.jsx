import React, { useContext } from "react";
import { useEffect } from "react";
import { StateContext } from "../context/StateContext";
import "../App.css";
import hunterImage from "../images/hunter.png";
import { useNavigate } from "react-router-dom";

function HunterEmblem() {
  const { user, setUser, userProfile, setUserProfile, hunter, setHunter } =
    useContext(StateContext);

  let navigate = useNavigate();

  const handleClick = () => {
    navigate("/hunter");
  };
  
  useEffect(() => {
    fetch("/users")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUser(data[0]);
        fetchUserProfile(data[0]);
      });
  }, []);

  useEffect(() => {
    if (userProfile && userProfile.characters && !hunter.key) {
      setHunter({
        ...hunter,
        key: Object.keys(userProfile.characters.data)[0],
      });
      console.log("Characters", userProfile?.characters);
    }
  }, [userProfile]);

  async function fetchUserProfile(data) {
    const apiMembershipId = data.api_membership_id;
    fetch(
      `https://www.bungie.net/Platform/Destiny2/2/Profile/${apiMembershipId}/?components=200,205`,
      {
        headers: {
          "x-api-key": "68015959b1c44de5b97feb8911f11167",
        },
      }
    )
      .then((res) => res.json())
      .then(({ Response }) => {
        setUserProfile(Response);
      });
  }
  return (
    <div onClick={handleClick}>
      <div className="emblemDiv">
        <div
          className="emblemImg"
          style={{
            backgroundImage: `url(https://bungie.net${
              userProfile?.characters?.data[hunter.key]?.emblemBackgroundPath
            })`,
          }}
        >
          <div>
            <h1 className="characterName">Hunter</h1>
            <p className="characterTitle">Vidmaster</p>
          </div>
          <h1 className="characterLightLevel">
            {userProfile?.characters?.data[hunter.key]?.light}
          </h1>
        </div>
      </div>
      <img className="characterLargeImage" src={hunterImage} />
    </div>
  );
}

export default HunterEmblem;
