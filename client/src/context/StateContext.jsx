import React from "react";
import { useState } from "react";

export const StateContext = React.createContext({
  setUser: () => undefined,
  setCharacters: () => undefined,
});
const StateProvider = StateContext.Provider;

function StateContextProvider({ children }) {
  const [user, setUser] = useState({});

  const [hunter, setHunter] = useState({});
  const [titan, setTitan] = useState({});
  const [warlock, setWarlock] = useState({});
  const [loadout, setLoadout] = useState([]);
  console.log(loadout);

  return (
    <StateProvider
      value={{
        user,
        setUser,
        titan,
        setTitan,
        hunter,
        setHunter,
        warlock,
        setWarlock,
        loadout,
        setLoadout,
      }}
    >
      {children}
    </StateProvider>
  );
}

export default StateContextProvider;
