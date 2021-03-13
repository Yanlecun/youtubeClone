import React, { useEffect } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import NavBar from "../NavBar/NavBar";

function LandingPage(props) {
  //Landing페이지 왔을 때 제일 먼저 실행되는 메소드

  return (
    <React.Fragment>
      <NavBar />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100vh",
        }}
      >
        <h2>시작 페이지</h2>
        <br />
      </div>
    </React.Fragment>
  );
}

export default withRouter(LandingPage);
