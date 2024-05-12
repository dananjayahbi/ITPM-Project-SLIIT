import React from "react";
import { Row, Col, Card } from "antd";

const CompanyDashboard = () => {
  return (
    <div style={{ margin: "auto", textAlign: "center" }}>
      <Row justify="center" style={{ marginBottom: 20 }}>
        <h2 style={{fontSize:"25px"}}>Trend</h2>
      </Row>
      <Row justify="center" gutter={[16, 16]}>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card
            style={{
              textAlign: "center",
              height: 180,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              margin: 12,
              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
              borderRadius: "15px",
            }}
          >
            <div style={{ fontSize: 34, fontWeight: "bold" }}>10</div>
            <div style={{ fontSize: 18, marginTop: 10 }}>Requests</div>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card
            style={{
              textAlign: "center",
              height: 180,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              margin: 12,
              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
              borderRadius: "15px",
            }}
          >
            <div style={{ fontSize: 34, fontWeight: "bold" }}>6</div>
            <div style={{ fontSize: 18, marginTop: 10 }}>Bins</div>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card
            style={{
              textAlign: "center",
              height: 180,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              margin: 12,
              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
              borderRadius: "15px",
            }}
          >
            <div style={{ fontSize: 34, fontWeight: "bold" }}>5</div>
            <div style={{ fontSize: 18, marginTop: 10 }}>Customers</div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CompanyDashboard;
