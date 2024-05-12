import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from "axios";
import { Input, Button, Form } from 'antd';
import { LeftCircleOutlined } from '@ant-design/icons'; // Import the Ant Design icon for the left arrow
import "./Bin.css/CreateBin.css";

const UpdateBin = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [form] = Form.useForm();

    const [bin, setBin] = useState({
        binID: "",
        binName: "",
        binLocation: "",
        binOpenTime: "",
        binCloseTime: ""
    });

    useEffect(() => {
        axios.get(`http://localhost:5000/api/bin/getbin/${id}`)
            .then((response) => {
                console.log("Fetched bin data:", response.data);
                setBin(response.data);
                form.setFieldsValue(response.data); // Set form fields value after fetching data
            })
            .catch((error) => {
                console.log(error);
            });
    }, [id]);

    const onFinish = async (values) => {
        try {
            await axios.put(`http://localhost:5000/api/bin/updatebin/${id}`, values);
            console.log("Bin updated successfully:", values);
            window.alert("Bin updated successfully!");
            navigate("/binall");
        } catch (error) {
            console.log(error);
            window.alert("Error updating bin. Please try again later.");
        }
    };

    return (
        <div className='AddBin' style={{ maxWidth: 600, margin: 'auto', padding: 20 ,height:'auto' ,width:'auto' }}>
            <Link to={"/binall"} style={{ fontSize: '18px', marginRight: '5px' }}>
                <LeftCircleOutlined style={{ fontSize: '18px' }} /> Back
            </Link>
            <h3 style={{ textAlign: 'center', color: 'black', marginBottom: '20px', fontSize: '25px' }}>Update Bin</h3>
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
            >
                <Form.Item label="Bin ID" name="binID">
                    <Input placeholder="Bin ID" />
                </Form.Item>
                <Form.Item label="Bin Name" name="binName">
                    <Input placeholder="Bin Name" />
                </Form.Item>
                <Form.Item label="Bin Location" name="binLocation">
                    <Input placeholder="Bin Location URL" />
                </Form.Item>
                <Form.Item label="Bin Open Time" name="binOpenTime">
                    <Input placeholder="Bin Open Time" />
                </Form.Item>
                <Form.Item label="Bin Close Time" name="binCloseTime">
                    <Input placeholder="Bin Close Time" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Update Bin
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default UpdateBin;
