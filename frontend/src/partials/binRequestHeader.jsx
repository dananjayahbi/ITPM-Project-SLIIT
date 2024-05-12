import React from "react";
import { Layout, Menu } from "antd";
import { useLocation, Link } from "react-router-dom";

const { Header } = Layout;

const HeaderComponent = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (

    <div>
      <center style={{fontSize:'40px' ,marginBottom:'40px'}}>Manage Bin Requests</center>
    <Header
      style={{
        
        marginLeft: '280px',
        display: "flex",
        justifyContent: "space-between",
        zIndex: 1,
        width: "51%",
        marginBottom: '20px',
        borderRadius: '20px',
        backgroundColor: 'transparent',
      }}
    >
      <div style={{ maxWidth: "1200px", width: "100%", margin: "0 auto" }}>
        <div>
          <a href="/"></a>
        </div>
        <Menu
          theme="light"
          mode="horizontal"
          className="custom-header"
          style={{
            lineHeight: "64px",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            backgroundColor: "transparent",
            border: "none",
            boxShadow: "none",
          }}
        >
          <Menu.Item key="all" style={{ color: isActive("/binRequestAdmin") ? "#24DE43" : "inherit" }}>
            <Link to="/binRequestAdmin">ALL</Link>
          </Menu.Item>
          <Menu.Item key="pending" style={{ color: isActive("/binRequestPending") ? "#24DE43" : "inherit" }}>
            <Link to="/binRequestPending">PENDING</Link>
          </Menu.Item>
          <Menu.Item key="accepted" style={{ color: isActive("/acceptedBinRequest") ? "#24DE43" : "inherit" }}>
            <Link to="/acceptedBinRequest">ACCEPTED</Link>
          </Menu.Item>
          <Menu.Item key="rejected" style={{ color: isActive("/rejectedBinRequestAdmin") ? "#24DE43" : "inherit" }}>
            <Link to="/rejectedBinRequestAdmin">REJECTED</Link>
          </Menu.Item>
        </Menu>
      </div>
    </Header>
    </div>
  );
};

export default HeaderComponent;
