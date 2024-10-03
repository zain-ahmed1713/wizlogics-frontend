import React from "react";
import { Outlet } from "react-router-dom";
import { Nav } from "./components/Nav";

function App() {
  return (
    <div className="w-screen h-screen bg-[#0e1827] overflow-hidden">
      <Nav />
      <Outlet />
    </div>
  );
}

export default App;
