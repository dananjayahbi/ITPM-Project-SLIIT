import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Table, Row, Col,Button } from "antd";
import { FilePdfOutlined } from '@ant-design/icons';
import jsPDF from "jspdf";
import 'jspdf-autotable';



const SubscribedSellars = () => {
  const { companyId } = useParams();
  const [companyDetails, setCompanyDetails] = useState(null);
  const [subscribedSellers, setSubscribedSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log(companyId);

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/company/${companyId}`
        );
        if (response.data.success) {
          setCompanyDetails(response.data);
          console.log("Company Details:", response.data);
        } else {
          console.error("Error fetching company details:", response.data.msg);
        }
      } catch (error) {
        console.error("Error fetching company details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyDetails();
  }, [companyId]);

  useEffect(() => {
    if (companyDetails) {
      fetchSubscribedSellers();
    }
  }, [companyDetails]);

  const fetchSubscribedSellers = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/subscription/${companyId}/subscribedSellers`
      );
      console.log(response);
      if (response.data.success) {
        setSubscribedSellers(response.data.subscribedSellers);
        console.log("Subscribed Sellers:", response.data.subscribedSellers);
      } else {
        console.error("Error fetching subscribed sellers:", response.data.msg);
      }
    } catch (error) {
      console.error("Error fetching subscribed sellers:", error);
    }
  };
  const columns = [
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
  ];
  const exportPDF = () => {
    const unit = "pt";
    const size = "A4";
    const orientation = "portrait";
  
    const doc = new jsPDF(orientation, unit, size);
  
    doc.setFontSize(15);
  
    const title = `${companyDetails.buyer.companyName} - Subscribed Sellers Report`;
    const headers = columns.map(column => column.title); 
  
    const data = subscribedSellers.map(seller => [
      seller.firstName,
      seller.lastName,
      seller.phone,
      seller.address
    ]);
  
    doc.text(title, 40, 40);
    doc.autoTable({ startY: 50, head: [headers], body: data });
    doc.save("subscribed_sellers_report.pdf");
  };
  
  

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : companyDetails ? (
        <div>
          <Row>
            <Col span={10}>
              <h1 style={{ fontSize: "25px" ,marginLeft:"60px",fontStyle:"italic",color:"green", fontWeight: 500}}>
                {companyDetails.buyer.companyName}
              </h1>
            </Col>
            <Col span={10}>
              <h2 style={{ fontSize: "30px", fontWeight: 500}}>Subscribed Sellers</h2>
            </Col>
            <Col>
            <Button type="primary" style={{color:"#fff",height:40}} onClick={exportPDF} icon={<FilePdfOutlined />}>Generate PDF</Button>
            </Col>
          </Row>          
          <div style={{marginTop:50}}>
            <Table dataSource={subscribedSellers} columns={columns} />
          </div>
        </div>
      ) : (
        <p>No company details found</p>
      )}
    </div>
  );
};

export default SubscribedSellars;
