import React, { useState, useEffect } from 'react';
import axios from 'axios';
       import { Table, Input, Button, Space, Typography,Row,Col } from 'antd';
import { SearchOutlined, EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const { Text } = Typography;

const AllSellers = () => {
  const [sellers, setSellers] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');

  useEffect(() => {
    getAllSellers();
  }, []);

  const getAllSellers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/sellar/all");
      if (response.status === 200) {
        // Add a unique key for each seller
        const sellersWithKeys = response.data.sellers.map((seller, index) => ({ ...seller, key: index.toString() }));
        setSellers(sellersWithKeys);
        console.log("Sellers Retrieved successfully", sellersWithKeys);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Search functions
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex] ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()) : '',
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => document.getElementById('search-input').select(), 100);
      }
    },
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const columns = [
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName',
      ...getColumnSearchProps('firstName'),
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastName',
      ...getColumnSearchProps('lastName'),
    },
    {
      title: 'Email',
      dataIndex: ['user', 'email'], // Access nested object property
      key: 'email',
      ...getColumnSearchProps('email'),
    },
    {
      title: 'Phone Number',
      dataIndex: 'phone',
      key: 'phone',
      ...getColumnSearchProps('phone'),
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      ...getColumnSearchProps('address'),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" icon={<EyeOutlined />}/>
          <Button type="primary" icon={<EditOutlined/>}/>
          <Button type="danger" icon={<DeleteOutlined style={{ color: 'red' }} />}/>
        </Space>
      ),
    },
  ];
  return (
    <div>
        <Row>
        <h1 style={{ margin: "auto", fontSize: "35px", fontWeight: 500,marginBottom:50 }}>
          All Sellars
        </h1>
      </Row>
      <Table columns={columns} dataSource={sellers} />
    </div>
  );
};

export default AllSellers;
