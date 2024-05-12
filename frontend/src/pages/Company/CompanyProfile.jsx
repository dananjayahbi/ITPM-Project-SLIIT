import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Form, Input, Card, Row, Col, Button, Avatar, Spin, Modal } from "antd";
import { useNavigate } from "react-router-dom";

const CompanyProfile = () => {
  const { companyId } = useParams();
  const [companyDetails, setCompanyDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const navigate = useNavigate();
  console.log("CompanyProfile - companyId:", companyId);
  useEffect(() => {
    const fetchCompanyDetails = async () => {
      try {
        console.log("Fetching company details for companyId:", companyId);
        const response = await axios.get(
          `http://localhost:5000/api/company/${companyId}`
        );
        console.log("Request URL:", response.config.url);
        if (response.data.success) {
          setCompanyDetails(response.data.buyer);
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

  const handleDelete = async () => {
    try {
      setDeleteLoading(true);
      const response = await axios.delete(
        `http://localhost:5000/api/company/${companyId}`
      );
      if (response.data.success) {
        console.log("Company deleted successfully");
        navigate("/landing");
      } else {
        console.error("Error deleting company:", response.data.msg);
      }
    } catch (error) {
      console.error("Error deleting company:", error);
    } finally {
      setDeleteLoading(false);
    }
  };
  const handleUpdate = () => {
    navigate(`/company/${companyId}/update`);
  };

  const confirmDelete = () => {
    Modal.confirm({
      title: "Confirm Delete",
      content: "Are you sure you want to delete this company?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        handleDelete();
      },
    });
  };

  const renderForm = () => {
    return (
      <Card
        style={{
          width: 1000,
          margin: "0px auto 20px auto",
          boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
          padding: "20px 60px 60px 60px",
        }}
        loading={loading}
      >
        <Row gutter={16}>
          <Col span={14}>
            <h2
              style={{
                marginBottom: 50,
                textAlign: "center",
                fontWeight: 400,
                fontSize: "25px",
              }}
            >
              Company Details
            </h2>
          </Col>
          <Col style={{ marginLeft: 120 }} span={1}>
            <Button type="primary" onClick={handleUpdate}>
              Update
            </Button>
          </Col>
          <Col style={{ marginLeft: 50 }} span={1}>
            <Button
              style={{ background: "red", color: "#fff", marginRight: 0 }}
              type="danger"
              onClick={confirmDelete}
              loading={deleteLoading}
            >
              Delete
            </Button>
          </Col>
        </Row>

        <Form layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Company Name">
                <Input value={companyDetails.companyName} readOnly />
              </Form.Item>
              <Form.Item label="Company Email">
                <Input value={companyDetails.user.email} readOnly />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Company Image">
                <div style={{ textAlign: "center", marginBottom: 0 }}>
                  <img
                    src={companyDetails.companyImage}
                    alt="Company Image"
                    style={{ maxWidth: "100%", maxHeight: "120px" }}
                  />
                </div>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Number of Centers">
                <Input value={companyDetails.numberOfCenters} readOnly />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label="Company Slogan">
            <Input value={companyDetails.companySlogan} readOnly />
          </Form.Item>

          <Form.Item label="Company About">
            <Input.TextArea
              value={companyDetails.companyAbout}
              rows={4}
              readOnly
            />
          </Form.Item>
          <Form.Item label="Open Hours">
            <Input value={companyDetails.openHours} readOnly />
          </Form.Item>
          <Form.Item label="Close Hours">
            <Input value={companyDetails.closeHours} readOnly />
          </Form.Item>
        </Form>
      </Card>
    );
  };

  return (
    <div>
      {loading ? (
        <Spin />
      ) : companyDetails ? (
        <div>{renderForm()}</div>
      ) : (
        <p>No company details found</p>
      )}
    </div>
  );
};

export default CompanyProfile;