import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Hunter from "./components/Hunter";
import Loadouts from "./components/Loadouts";
import Nav from "./components/Nav";
import Titan from "./components/Titan";
import Warlock from "./components/Warlock";
import About from "./components/About";
import StateContextProvider from "./context/StateContext";
import "./App.css";
import Login from "./components/Login";

function App() {
  return (
    <StateContextProvider>
      <Nav />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/loadouts" element={<Loadouts />}></Route>
        <Route path="/hunter" element={<Hunter />}></Route>
        <Route path="/warlock" element={<Warlock />}></Route>
        <Route path="/titan" element={<Titan />}></Route>
        <Route path="/about" element={<About />}></Route>
      </Routes>
    </StateContextProvider>
  );
}

export default App;
