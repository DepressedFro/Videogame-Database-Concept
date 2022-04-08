import React from "react";
import { Outlet } from "react-router-dom";

function Games() {
  return (
    <div className="home">
      <div class="container">
        <h1 className="text-center mt-5">Game Archive</h1>
        <Outlet />
      </div>
    </div>
  );
}

export default Games;