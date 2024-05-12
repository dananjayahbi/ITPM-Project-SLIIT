import axios from "axios";
import React, { useEffect, useState } from "react";
import "../CompanyAll/companyAll.scoped.css"; 
import { Layout, Row, Col,message } from "antd";
import {
  LikeFilled,
  DislikeFilled,
  PhoneFilled,
} from "@ant-design/icons";
import { Link } from 'react-router-dom';

const { Content } = Layout;

const AllCompany = ({ sellerId }) => {
  const [company, setCompany] = useState([]);
  const userId = window.localStorage.getItem("userId");

  useEffect(() => {
    getCompany();
  }, []);

  const getCompany = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/company/all");
      if (response.status === 200) {
        setCompany(response.data.companyAllData);
        console.log("Companies Retrieved successfully", response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubscribe = async (companyId) => {
    try {
        const response = await axios.post("http://localhost:5000/api/subscription/subscribe", {
            sellerId: userId, 
            companyId: companyId,
        });
        message.success("Company Subscribed successful!");
        console.log("Subscription successful:", response.data);
    } catch (error) {
      console.error("Error subscribing to company:", error);
      if (error.response && error.response.data && error.response.data.msg) {
        message.error(error.response.data.msg); 
      } else {
        message.error("Failed to subscribe to company."); 
      }
    }
};
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content>
        <div style={{marginTop:0}}>
          <Row gutter={24}>
            <Col span={15} style={{textAlign:'right',paddingRight:100,fontSize: "20px", fontWeight: '400'}}>
              <h1 style={{ margin: "auto", fontSize: "35px", fontWeight: 500 }}>
                All Companies
              </h1>
            </Col>
           <Col span={9}><Link to={"/ranking"}><button className="heading-row-btn">Ranking</button></Link> </Col>
          </Row>
        </div>
        <Row gutter={[150, 150]} style={{marginLeft:50}} className="card-item-container custom-row">
          {company.map((item) => (
            <Col key={item._id} xs={24} sm={12} md={8} lg={8} xl={8}>
              <div className="container">
                <div className="header-container">
                  <img
                    className="image-comapnyall"
                    src={item.companyImage}
                    alt=""
                  />
                </div>
                <div className="footer-container">
                  <div className="footer-icons">
                    <div className="footer-icons-left">
                      <div className="footer-icons-left-1">
                        <LikeFilled
                          style={{
                            fontSize: "25px",
                            height: "30px",
                            color: "#097969",
                            cursor: "pointer"
                          }}
                          onClick={() => handleSubscribe(item._id)}
                        />
                      </div>
                      <div className="footer-icons-left-2">
                        <DislikeFilled
                          style={{
                            fontSize: "25px",
                            height: "30px",
                            color: "#097969",
                          }}
                        />
                      </div>
                    </div>
                    <div className="footer-icons-right">
                      <PhoneFilled
                        style={{
                          fontSize: "25px",
                          height: "30px",
                          color: "#097969",
                        }}
                      />
                    </div>
                  </div>
                  <div className="description">
                    <span>{item.companyName}</span>
                  </div>
                  <div className="description-centers">
                    <span>{`+${item.numberOfCenters} Centers`}</span>
                  </div>
                  <div className="more-details-btn">
                    <button>For More Details</button>
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Content>
    </Layout>
  );
};

export default AllCompany;


