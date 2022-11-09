import { useState, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Main from "./components/Main";
import StateContextProvider from "./context/StateContext";

function App() {
  return (
    <StateContextProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />}></Route>
        <Route path="home/*" element={<Home />}></Route>
        <Route path="main/*" element={<Main />}></Route>
      </Routes>
    </StateContextProvider>
  );
}

export default App;
