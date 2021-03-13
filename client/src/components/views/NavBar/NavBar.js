import React from "react";
import LeftMenu from "./Sections/LeftMenu";
import RightMenu from "./Sections/RightMenu";

function NavBar() {
  return (
    <nav className="menuBar">
      <div className="logo"style={{marginLeft: '5px'}}>
        <a href="/">logo</a>
      </div>
      <div
        className="menuCon"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div className="leftMenu">
          <LeftMenu />
        </div>
        <div className="rightMenu">
          <RightMenu mode="horizontal"/>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
