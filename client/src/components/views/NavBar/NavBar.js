import React from "react";
import LeftMenu from "./Sections/LeftMenu";
import RightMenu from "./Sections/RightMenu";

function NavBar() {
  return (
    <nav className="menuBar" style={{display:'flex'}}>
      <div className="logo"style={{marginLeft: '5px', display: "flex", alignItems:"center"}}>
        <a href="/">logo</a>
      </div>
      <div
        className="menuCon"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          flexGrow: '1'
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
