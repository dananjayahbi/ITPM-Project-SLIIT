import React from "react";
import "../styles/landing.css";
import Sellar from "../assets/images/sellar/sellar.png";
import Buyer from "../assets/images/company/buyer.jpg";
import { Row, Col, Button } from "antd";

function Landing() {
  return (
    <div className="landing-page">
      <Row justify="center">
        <h2 className="title">JOIN US</h2>
      </Row>
      <Row gutter={[32, 32]} justify="center">
        <Col xs={22} sm={10} md={8} lg={6} className="item">
          <div className="item-content">
            <a href="/login">
            <Button
              className="landing-btn"
              style={{
                width: 150,
                height: 50,
                fontSize: 20,
                borderRadius: "40px",
                borderColor:"green",
                background:"green",
                color:"#fff"
              }}
            >
              Seller
            </Button>
            </a>
            <div className="image-container">
              <img src={Sellar} alt="Seller" className="item-img-sellar" />
            </div>
          </div>
        </Col>
        <Col xs={22} sm={10} md={8} lg={6} className="item">
          <div className="item-content">
            <a href="/login">
          <Button
              className="landing-btn"
              style={{
                width: 150,
                height: 50,
                fontSize: 20,
                borderRadius: "40px",
                borderColor:"green",
                background:"green",
                color:"#fff"
              }}
            >
              Buyer
            </Button>
            </a>
            <div className="image-container">
              <img src={Buyer} alt="Buyer" className="item-img-buyer" />
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Landing;
