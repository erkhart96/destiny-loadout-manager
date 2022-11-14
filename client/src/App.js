import { useState, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Loadouts from "./components/Loadouts";
import Main from "./components/Main";
import Nav from "./components/Nav";
import StateContextProvider from "./context/StateContext";

function App() {
  return (
    <StateContextProvider>
      <Nav />
      <Routes>
        <Route path="/" element={<Navigate to="/home" />}></Route>
        <Route path="home/*" element={<Home />}></Route>
        <Route path="main/*" element={<Main />}></Route>
        <Route path="loadouts/*" element={<Loadouts />}></Route>
      </Routes>
    </StateContextProvider>
  );
}

export default App;
