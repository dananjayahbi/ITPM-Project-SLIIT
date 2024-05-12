import React, { useState } from "react";
import axios from "axios";
import { Form, Input, Button, Row, Col, message } from "antd";
// import HeaderComponent from '../partials/Header';
import "../styles/form.css";
import SellarImg from "../assets/images/sellar/sellar.png";

const SellerRegister = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (value) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/sellar/register",
        value
      );
      if (response.data.success) {
        message.success("Seller registration successful!");
        console.log("Seller registration successful:", response.data);
        setTimeout(() => {
          window.location.href = "/login";
        }, 1000);
      } else {
        console.error("Error registering seller:", response.data.msg);
        message.error("Registration Failed!");
        message.error(response.data.msg);
      }
    } catch (error) {
      console.error("Error registering seller:", error);
      message.error("Error registering seller. Please try again later.");
    }
  };

  const inputStyle = { borderRadius: "40px", height: "40px" };
  const formStyle = { width: "80%", maxWidth: "600px" };
  const formItemLabelStyle = { fontSize: "40px" };
  const btnStyle = {
    fontSize: "20px",
    width: "150px",
    height: "50px",
    borderRadius: "40px",
  };
  const image = { height: "180px", width: "200px" };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "auto",
        }}
      >
        <Row gutter={24}>
          <Col span={8} style={{ textAlign: "center", marginBottom: "20px" }}>
            <img src={SellarImg} style={image} alt="Sellar Logo" />
          </Col>
          <Col
            span={16}
            style={{
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h1 style={{ fontSize: "25px", fontWeight: 500, paddingLeft: 40 }}>
              Seller Registration
            </h1>
          </Col>
        </Row>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          // minHeight: "100vh",
          marginTop: 35,
        }}
      >
        <Form layout="vertical" style={formStyle} onFinish={handleSubmit}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label={
                  <span className="custom-label-register ">First Name</span>
                }
                name="firstName"
                rules={[
                  { required: true, message: "Please input your first name!" },
                ]}
                Style={{ fontSize: "25px" }}
              >
                <Input
                  style={{ ...inputStyle, paddingLeft: "30px" }}
                  placeholder="Enter Your First Name"
                  onChange={handleChange}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={
                  <span className="custom-label-register ">Last Name</span>
                }
                name="lastName"
                rules={[
                  { required: true, message: "Please input your last name!" },
                ]}
                Style={formItemLabelStyle}
              >
                <Input
                  style={{ ...inputStyle, paddingLeft: "30px" }}
                  placeholder="Enter your last name"
                  onChange={handleChange}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label={<span className="custom-label-register ">Email</span>}
                name="email"
                rules={[
                  { type: "email", message: "Please enter a valid email!" },
                  { required: true, message: "Please input your email!" },
                ]}
                Style={formItemLabelStyle}
              >
                <Input
                  style={{ ...inputStyle, paddingLeft: "30px" }}
                  placeholder="Enter your email"
                  onChange={handleChange}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={<span className="custom-label-register ">Password</span>}
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
                Style={formItemLabelStyle}
              >
                <Input.Password
                  style={{ ...inputStyle, paddingLeft: "30px" }}
                  placeholder="Enter your password"
                  onChange={handleChange}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                label={
                  <span className="custom-label-register ">Phone Number</span>
                }
                name="phone"
                rules={[
                  {
                    required: true,
                    message: "Please input your phone number!",
                  },
                  {
                    pattern: /^[0-9]{10}$/,
                    message: "Please enter a valid 10-digit phone number!",
                  },
                ]}
                hasFeedback
                Style={formItemLabelStyle}
              >
                <Input
                  style={{ ...inputStyle, paddingLeft: "30px" }}
                  placeholder="Enter your phone number"
                  onChange={handleChange}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                label={<span className="custom-label-register ">Address</span>}
                name="address"
                rules={[
                  { required: true, message: "Please input your address!" },
                ]}
                Style={formItemLabelStyle}
              >
                <Input
                  style={{ ...inputStyle, paddingLeft: "30px" }}
                  placeholder="Enter your address"
                  onChange={handleChange}
                />
              </Form.Item>
            </Col>
          </Row>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <Form.Item style={{ marginTop: "50px" }}>
              <Button style={btnStyle} type="primary" htmlType="submit">
                Register
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
      <Row gutter={4} style={{ marginTop: 5 ,marginBottom:40}}>
        <div style={{display:"flex",margin:"auto"}}>
          <Col
            style={{
              margin: "auto",
              marginRight: 5,
              fontFamily: "Arial, Helvetica, sans-serif",
              fontWeight: 500,
            }}
          >
            Doesn't have an Account?
          </Col>
          <a href="/login">
            <Col
              style={{
                color: "blue",
                fontFamily: "Arial, Helvetica, sans-serif",
              }}
            >
              Login To Account
            </Col>
          </a>
        </div>
      </Row>
    </div>
  );
};

export default SellerRegister;
