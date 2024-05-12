import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { Form, Input, Button, Select } from 'antd';
import { LeftCircleOutlined } from '@ant-design/icons'; // Import the Ant Design icon for the left arrow

const { Option } = Select;

const CreateBin = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const onFinish = async (values) => {
        // Check if the binLocation is a valid URL
        const isValidUrl = isValidURL(values.binLocation);
        if (!isValidUrl) {
            window.alert("Please enter a valid URL for bin location.");
            return;
        }

        try {
            await axios.post('http://localhost:5000/api/bin/create', values);
            // Show success message
            window.alert("Bin added successfully!");
            navigate("/binall");
        } catch (error) {
            console.error("Error adding bin:", error);
            // Show error message
            window.alert("Error adding bin. Please try again later.");
        }
    };

    // Function to validate URL
    const isValidURL = (url) => {
        try {
            new URL(url);
            return true;
        } catch (error) {
            return false;
        }
    };

    return (
        <div className='AddBin' style={{ maxWidth: 600, margin: 'auto', padding: 20 ,height:'auto' ,width:'auto'}}>
            <Link to={"/binall"} style={{ fontSize: '18px', marginRight: '5px' }}>
                    <LeftCircleOutlined style={{ fontSize: '18px' }} /> Back to All Bins
                </Link>
            <h3 style={{ textAlign: 'center', color: 'black', marginBottom: 20, fontSize: 25 }}>Add New Bin</h3>
            <Form form={form} onFinish={onFinish} layout="vertical">
                <Form.Item name="binID" label="Bin ID" rules={[{ required: true, message: 'Please enter bin ID' }]}>
                    <Input placeholder="Bin ID" />
                </Form.Item>
                <Form.Item name="binName" label="Bin Name" rules={[{ required: true, message: 'Please enter bin name' }]}>
                    <Input placeholder="Bin Name" />
                </Form.Item>
                <Form.Item name="binLocation" label="Bin Location" rules={[{ required: true, message: 'Please enter bin location' }]}>
                    <Input placeholder="Bin Location" />
                </Form.Item>
                <Form.Item name="binOpenTime" label="Bin Open Time" rules={[{ required: true, message: 'Please enter bin open time' }]}>
                    <Input placeholder="Bin Open Time" />
                </Form.Item>
                <Form.Item name="binCloseTime" label="Bin Close Time" rules={[{ required: true, message: 'Please enter bin close time' }]}>
                    <Input placeholder="Bin Close Time" />
                </Form.Item>
                <Form.Item name="category" label="Category" rules={[{ required: true, message: 'Please select a category' }]}>
                    <Select placeholder="Select Category">
                        <Option value="Category1">Plastic</Option>
                        <Option value="Category2">Polystyrene</Option>
                    </Select>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{ width: '100%' }}>Add Bin</Button>
                </Form.Item>
            </Form>
            <style>
                {`
                    .ant-form-item-label {
                        color: black;
                        font-weight: bold;
                    }
                `}
            </style>
        </div>
    );
};

export default CreateBin;
