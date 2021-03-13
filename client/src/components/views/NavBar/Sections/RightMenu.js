import React from "react";
import { Menu } from "antd";
import axios from 'axios';
import { withRouter } from "react-router-dom";
import { useSelector } from "react-redux";
//const Upload = require('../../../../assets/images/upload.png');

const RightMenu = (props) => {
  const user = useSelector(state => state.user)
  const onClickLogout = () => {
    axios.get("api/users/logout").then((res) => {
      if (res.data.success) {
        alert("로그아웃 되었습니다.");
        // props 인식 못 하면 export 부분에 withRoter() 달아주면 인식 잘 한다.
        props.history.push("/login");
      } else {
        alert("로그아웃에 실패하였습니다.");
      }
    });
  };
  if (user.userData && !user.userData.isAuth) {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="mail">
          <a href="/login">Sign In</a>
        </Menu.Item>
        <Menu.Item key="app">
          <a href="/register">Sign Up</a>
        </Menu.Item>
      </Menu>
    )
  } else {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="create">
          <a href="/video/upload">Upload</a>
        </Menu.Item>
        <Menu.Item key="logout">
          <a onClick={onClickLogout}>Logout</a>
        </Menu.Item>
      </Menu>
    )
  }
};
export default withRouter(RightMenu);
