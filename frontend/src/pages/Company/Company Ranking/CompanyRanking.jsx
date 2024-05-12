import React, { useState, useEffect } from "react";
import { Row, Table,Col, Button, Input } from "antd";
import { EyeOutlined,SearchOutlined , ShoppingCartOutlined } from "@ant-design/icons";
import axios from "axios";
import './ranking.scopped.css';

const CompanyRanking = () => {
  const [rankedCompanies, setRankedCompanies] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    fetchRankedCompanies();
  }, []);

  const fetchRankedCompanies = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/subscription/ranking");
      if (response.data.success) {
        setRankedCompanies(response.data.rankedCompanies);
      } else {
        console.error("Error fetching ranked companies:", response.data.msg);
      }
    } catch (error) {
      console.error("Error fetching ranked companies:", error);
    }
  };

  const handleViewCompany = (companyId) => {
    console.log("View company:", companyId);
  };

  const handleAddToCart = (companyId) => {
    console.log("Add to cart:", companyId);
  };

  const columns = [
    {
      title: "Rank",
      dataIndex: "rank",
      key: "rank",
      align: "center",
    },
    {
      title: "Company Name",
      dataIndex: "companyName",
      key: "companyName",
      align: "center",
    },
    {
      title: "Total Customers",
      dataIndex: "subscribedSellersCount",
      key: "subscribedSellersCount",
      align: "center",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <span>
          <Button style={{ paddingRight: 30 }} type="link" onClick={() => handleViewCompany(record._id)}>
            <EyeOutlined style={{ fontSize: "19px" }} /> View
          </Button>
          <Button type="primary" onClick={() => handleAddToCart(record._id)}>
            <ShoppingCartOutlined style={{ fontSize: "18px" }} /> Shop
          </Button>
        </span>
      ),
      align: "center",
    },
  ];

  const filteredCompanies = rankedCompanies.filter(company =>
    company.companyName.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleSearch = () => {
    const filteredCompanies = rankedCompanies.filter(company =>
      company.companyName.toLowerCase().includes(searchValue.toLowerCase())
    );
    setRankedCompanies(filteredCompanies);
  };
  const resetSearch = () => {
    setSearchValue('');
    fetchRankedCompanies();
  };

  return (
    <div>
      <Row>
        <h1 style={{ margin: "auto", fontSize: "30px", fontWeight: 500, marginBottom: 40, marginTop: 0 }}>
          Company Rankings
        </h1>
      </Row>
      <Row gutter={10} style={{marginBottom: 20 }}>
        <Col style={{marginLeft:900}}>
        <Input
          placeholder="Search by Company Name"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          style={{ width: 200 }}
        />
          <Button style={{ marginLeft: 4 }} type="primary" onClick={handleSearch} icon={<SearchOutlined />}>
            Search
          </Button>
          <Button style={{ marginLeft: 4 }} onClick={resetSearch}>
            Reset
          </Button>
        </Col>
      </Row>
      <Table
        dataSource={filteredCompanies}
        columns={columns}
        pagination={false}
        bordered
        style={{ borderRadius: 40 }}
        className="custom-table"
        rowClassName="custom-row"
      />
    </div>
  );
};

export default CompanyRanking;
