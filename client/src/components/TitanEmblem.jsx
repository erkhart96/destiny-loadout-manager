import React, { useContext } from "react";
import { useEffect } from "react";
import { StateContext } from "../context/StateContext";
import "../App.css";

function TitanEmblem() {
  const { user, setUser, userProfile, setUserProfile, titan, setTitan } =
    useContext(StateContext);
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
    if (userProfile && userProfile.characters && !titan.key) {
      setTitan({
        ...titan,
        key: Object.keys(userProfile.characters.data)[2],
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
          {userProfile?.characters?.data[titan.key]?.light}
        </h1>
      </div>
    </div>
  );
}
export default TitanEmblem;
