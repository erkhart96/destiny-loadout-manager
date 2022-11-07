import { useState, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Main from "./components/Main";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />}></Route>
        <Route path="home/*" element={<Home />}></Route>
        <Route path="main/*" element={<Main />}></Route>
      </Routes>
    </div>
  );
}

export default App;
