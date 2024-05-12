import React from "react";
import { Button, Image } from "antd";
import HomeImg from "../../assets/images/sellar/homepage.jpg";
import "../../styles/sellar-dashboard.css";
import { Link } from "react-router-dom";

const SellerDashboard = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ marginBottom: "20px" }}>        
        <img src={HomeImg}  style={{ maxWidth: "700px", borderRadius: "8px"}}/>
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
        <Link to="/binRequest">
          <Button
            type="primary"
            className="homebtn-css"
            style={{
              height: 60,
              borderRadius: "20px 0 20px 0",
              width: 210,
              fontSize: 20,
              fontWeight: 500,
              margin: 12,
              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            }}
          >
            Schedule Pickup
          </Button>
        </Link>

        <Link to='/ranking'>
          <Button
            type="primary"
            className="homebtn-css"
            style={{
              height: 60,
              borderRadius: " 0 20px 0 20px",
              width: 210,
              fontSize: 20,
              fontWeight: 500,
              background: "#fff",
              color: "green",
              margin: 12,
              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            }}
          >
            View Ratings
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default SellerDashboard;
