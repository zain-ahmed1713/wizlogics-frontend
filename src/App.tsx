import React from "react";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="w-screen h-screen bg-[#0e1827]">
      <Outlet />
    </div>
  );
}

export default App;
