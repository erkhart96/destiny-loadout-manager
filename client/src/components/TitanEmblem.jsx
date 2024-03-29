import React, { useContext } from "react";
import { useEffect } from "react";
import { StateContext } from "../context/StateContext";
import titanImage from "../images/titan.png";
import { useNavigate } from "react-router-dom";
import { ReactComponent as LightLogo } from "../lightIcon.svg";
import "../App.css";

function TitanEmblem() {
  const { setUser, userProfile, setUserProfile, titan, setTitan } =
    useContext(StateContext);

  let navigate = useNavigate();
  const API_KEY = process.env.REACT_APP_API_KEY;

  const handleClick = () => {
    navigate("/titan");
  };

  useEffect(() => {
    fetch("/users")
      .then((res) => res.json())
      .then((data) => {
        setUser(data[0]);
        fetchUserProfile(data[0]);
      });
  }, []);

  useEffect(() => {
    if (userProfile && userProfile.characters && !titan.key) {
      setTitan({
        ...titan,
        key: Object.keys(userProfile.characters.data)[2],
      });
    }
  }, [userProfile]);

  async function fetchUserProfile(data) {
    const apiMembershipId = data.api_membership_id;
    fetch(
      `https://www.bungie.net/Platform/Destiny2/2/Profile/${apiMembershipId}/?components=200,205`,
      {
        headers: {
          "x-api-key": API_KEY,
        },
      }
    )
      .then((res) => res.json())
      .then(({ Response }) => {
        setUserProfile(Response);
      });
  }
  return (
    <div className="characterDiv" onClick={handleClick}>
      <div className="emblemDiv">
        <div
          className="emblemImg"
          style={{
            backgroundImage: `url(https://bungie.net${
              userProfile?.characters?.data[titan.key]?.emblemBackgroundPath
            })`,
          }}
        >
          <div>
            <h1 className="characterName">Titan</h1>
            <p className="characterTitle">Exo</p>
          </div>
          <h1 className="characterLightLevel">
            <LightLogo height={23} width={23} />
            {userProfile?.characters?.data[titan.key]?.light}
          </h1>
        </div>
      </div>
      <img className="characterLargeImage" src={titanImage} />
    </div>
  );
}
export default TitanEmblem;
