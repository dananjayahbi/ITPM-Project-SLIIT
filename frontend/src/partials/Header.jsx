import React from "react";
import { Layout, Menu, Button, Dropdown, Avatar } from "antd";
import {
  UserOutlined,
  DownOutlined,
  HomeOutlined,
  ShopOutlined,
  QuestionCircleOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import "../styles/Header.css";

import Logo from "../assets/images/logo.png";

const { Header } = Layout;

const HeaderComponent = () => {
  const handleSignOut = () => {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("LoggedIn");
    window.localStorage.removeItem("cartItems");
    window.location.href = "/login";
  };

  const userMenu = (
    <Menu>
      <Menu.Item>
        <Link to="/yourDetails">Profile</Link>
      </Menu.Item>
      <Menu.Item>
        <Link onClick={handleSignOut} to="/signout">
          Sign out
        </Link>
      </Menu.Item>
    </Menu>
  );

  return (
    
    <Header
      style={{
        backgroundColor: "#f5f5f5",
        top:"10px",
        position: "relative",
        display: "flex",
        justifyContent: "space-between",
        zIndex: 1,
        width: "100%",
        
      }}
    >
      <div>
        <a href="/">
          <img
            
            src={Logo}
            width="80px"
            alt="logo"
            style={{marginTop:"-12px"}}
           
          />
        </a>
      </div>
      <Menu
        theme="light"
        mode="horizontal"
        className="custom-header"
        defaultSelectedKeys={["home"]}
        style={{
          lineHeight: "64px",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          backgroundColor: "#f5f5f5",
          border: "none",
          boxShadow: "none",
        }}
      >
        <Menu.Item
          key="home"
          icon={<HomeOutlined />}
          style={{ backgroundColor: "#f5f5f5" }}
        >
          <Link to="/">HOME</Link>
        </Menu.Item>
        <Menu.Item
          key="shop"
          icon={<ShopOutlined />}
          style={{ backgroundColor: "#f5f5f5" }}
        >
          <Link to="/store">SHOP</Link>
        </Menu.Item>
        <Menu.Item
          key="about"
          icon={<QuestionCircleOutlined />}
          style={{ backgroundColor: "#f5f5f5" }}
        >
          <Link to="/about">ABOUT</Link>
        </Menu.Item>
        <Menu.Item
          key="buyers"
          icon={<UserSwitchOutlined />}
          style={{ backgroundColor: "#f5f5f5" }}
        >
          <Link to="/buyers">BUYERS</Link>
        </Menu.Item>

        <Menu.Item
          key="contact"
          icon={<UserOutlined />}
          style={{ backgroundColor: "#f5f5f5" }}
        >
          <Link to="/contact">CONTACT</Link>
        </Menu.Item>
      </Menu>
      <div style={{ float: "right" }}>
        <Dropdown overlay={userMenu} trigger={["click"]}>
          <Button
            shape="circle"
            style={{
              border: "none",
              width: "80px",
              height: "50px",
              backgroundColor: "transparent",
              boxShadow: "none",
            }}
          >
            <Avatar icon={<UserOutlined />} />
            <DownOutlined />
          </Button>
        </Dropdown>
      </div>
    </Header>
  );
};

export default HeaderComponent;
