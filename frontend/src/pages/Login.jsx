import React from "react";
import { Form, Input, Button, message, Row, Col } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "../styles/form.css";
import LoginImg from "../assets/images/login.png";
import BuyerImg from "../assets/images/company/buyer.jpg";
import SellarImg from "../assets/images/sellar/sellar.png";

const Login = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/user/login",
          values
        );
        console.log("Login successful", response.data);
        message.success("Login successful");
        
        window.localStorage.setItem("token", response.data.token);
        window.localStorage.setItem("userId", response.data.userId);
        window.localStorage.setItem("role", response.data.role);

        // Set LoggedIn to true
        window.localStorage.setItem("LoggedIn", true);

        window.location.href = "/";
      } catch (error) {
        console.error("Login failed", error);
        message.error("Login failed. Please check your credentials.");
      }
    },
  });

  const inputStyle = { borderRadius: "40px", height: "50px" };
  const btnStyle = {
    fontSize: "20px",
    width: "100%",
    height: "50px",
    borderRadius: "40px",
  };
  const labelStyle = { fontSize: "20px" };
  const loginImage = { marginLeft: 100 };

  return (
    <div style={{ marginTop: 50 }}>
      <Row>
        <h1 style={{ margin: "auto", fontSize: "35px", fontWeight: 500 }}>
          LOGIN
        </h1>
      </Row>
      <Row gutter={24}>
        <Col span={12} style={{ paddingLeft: 150 }}>
          <img src={LoginImg} style={loginImage} />
          <Row gutter={24} style={{ marginTop: -100 }}>
            <Col span={12}>
              <img
                src={SellarImg}
                style={{ height: 150, marginLeft: 175, marginTop: -45 }}
              />
            </Col>
            <Col span={12}>
              <img src={BuyerImg} style={{ height: 100, marginLeft: 105 }} />
            </Col>
          </Row>
        </Col>
        <Col span={12}>
          <div style={{ width: 500, margin: "auto", marginTop: 150 }}>
            <Form layout="vertical" onFinish={formik.handleSubmit}>
              <Form.Item
                label={<span className="custom-label">Email</span>}
                name="email"
                validateStatus={formik.errors.email ? "error" : ""}
                help={formik.errors.email}
                style={labelStyle}
              >
                <Input
                  name="email"
                  className="custom-input"
                  style={{
                    ...inputStyle,
                    paddingLeft:'30px'
                  }}
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Enter your email"
                />
              </Form.Item>
              <Form.Item
                label={<span className="custom-label">Password</span>}
                name="password"
                validateStatus={formik.errors.password ? "error" : ""}
                help={formik.errors.password}
              >
                <Input.Password
                  name="password"
                  style={{
                    ...inputStyle,
                    fontSize: "18px",
                    padding: "0px 30px 0px 30px",
                    // paddingLeft: '30px'
                  }}
                  // className="custom-input"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Enter your password"
                />
              </Form.Item>
              <div style={{ marginTop: 70 }}>
                <Form.Item>
                  <Button type="primary" htmlType="submit" style={btnStyle}>
                    Login
                  </Button>
                </Form.Item>
              </div>
            </Form>
            <Row gutter={4} style={{marginLeft:15,marginTop:25}}>
              <Col style={{marginRight:5,fontFamily:"Arial, Helvetica, sans-serif",fontWeight:500}}>Doesn't have an Account?</Col>
              <a href="/seller-register">
              <Col style={{color:"blue",fontFamily:"Arial, Helvetica, sans-serif"}}>Create A New Account</Col>
              </a>              
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
