import React, { useContext } from "react";
import { useEffect } from "react";
import { StateContext } from "../context/StateContext";
import "../App.css";
import warlockImage from "../images/warlock.png";
import { ReactComponent as LightLogo } from "../lightIcon.svg";
import { useNavigate } from "react-router-dom";

function WarlockEmblem() {
  const { setUser, userProfile, setUserProfile, warlock, setWarlock } =
    useContext(StateContext);
  const API_KEY = process.env.REACT_APP_API_KEY;

  let navigate = useNavigate();

  const handleClick = () => {
    navigate("/warlock");
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
    if (userProfile && userProfile.characters && !warlock.key) {
      setWarlock({
        ...warlock,
        key: Object.keys(userProfile.characters.data)[1],
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
              userProfile?.characters?.data[warlock.key]?.emblemBackgroundPath
            })`,
          }}
        >
          <div>
            <h1 className="characterName">Warlock</h1>
            <p className="characterTitle">Awoken</p>
          </div>
          <h1 className="characterLightLevel">
            <LightLogo height={23} width={23} />
            {userProfile?.characters?.data[warlock.key]?.light}
          </h1>
        </div>
      </div>
      <img className="characterLargeImage" src={warlockImage} />
    </div>
  );
}
export default WarlockEmblem;
