import { useState, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Hunter from "./components/Hunter";
import Loadouts from "./components/Loadouts";
import Main from "./components/Main";
import Nav from "./components/Nav";
import Titan from "./components/Titan";
import Warlock from "./components/Warlock";
import StateContextProvider from "./context/StateContext";
import "./App.css";

function App() {
  return (
    <StateContextProvider>
      <Nav />
      <Routes>
        <Route path="/" element={<Navigate to="/home" />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/main" element={<Main />}></Route>
        <Route path="/loadouts" element={<Loadouts />}></Route>
        <Route path="/hunter" element={<Hunter />}></Route>
        <Route path="/warlock" element={<Warlock />}></Route>
        <Route path="/titan" element={<Titan />}></Route>
      </Routes>
    </StateContextProvider>
  );
}

export default App;
