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
      }}
    >
      {children}
    </StateProvider>
  );
}

export default StateContextProvider;
