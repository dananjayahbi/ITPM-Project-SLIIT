import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import "../styles/SideMenu.css";

const SideMenu = ({ menuItems }) => {
  return (
    <Menu
      theme="light"
      mode="vertical"
      defaultSelectedKeys={["0"]}
      className="custom-menu"
      style={{
        boxShadow:
          "0px 4px 4px rgba(0, 0, 0, 0.25)",
        borderRadius: "15px",
        height: "500px",
        width: "250px",
        marginLeft: "30px",
        padding: "50px 10px 10px 10px",
        position: "fixed",
        left: 10,
        top: 130,
        bottom: 0,
        borderRight: 0,
      }}
    >
      {menuItems.map((item, index) => (
        <Menu.Item
          key={index}
          style={{ display: "flex", flexDirection: "column", marginBottom: "20px" }}
        >
          <Link to={item.path}>
            {item.icon && (
              <item.icon style={{ fontSize: "1.5em", color: "#7a7d7b" }} />
            )}
            <span style={{ marginLeft: "1em" }}>{item.label}</span>
          </Link>
        </Menu.Item>
      ))}
    </Menu>
  );
};

export default SideMenu;
