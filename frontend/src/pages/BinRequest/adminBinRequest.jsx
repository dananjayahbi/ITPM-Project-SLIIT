import React, { useState, useEffect } from 'react';
import axios from "axios";
import HeaderComponent from "../../partials/Header";
import BinRequestHeader from "../../partials/binRequestHeader";
import { useNavigate } from "react-router-dom";
import { Popconfirm, Alert } from 'antd'; // Import Alert component from Ant Design

import img from './all.png';
import { Modal, Button, Form, Input } from 'antd'; // Import Modal, Button, and Form from Ant Design

export default function Item() {
    const [item, setItem] = useState([]);
    const [editItem, setEditItem] = useState(null);
    const navigate = useNavigate();
    const [modalVisible, setModalVisible] = useState(false); // State to manage modal visibility
    const [modalData, setModalData] = useState(null); // State to store modal data
    const [alertVisible, setAlertVisible] = useState(false); // State to manage alert visibility
    const [alertContent, setAlertContent] = useState(''); // State to store alert content

    useEffect(() => {
        function getItem() {
            axios.get("http://localhost:5000/api/binRequest/getall")
                .then((res) => {
                    console.log(res.data);
                    setItem(res.data);
                })
                .catch((err) => {
                    alert(err.message);
                });
        }
        getItem();
    }, []);

    const onFinish = (values) => {
        axios.put(`http://localhost:5000/api/binRequest/update/${editItem._id}`, values)
            .then(response => {
                console.log(response.data);
                setModalVisible(false);
                setAlertContent("Successfully updated");
                setAlertVisible(true);
                setTimeout(() => {
                    setAlertVisible(false);
                }, 3000)
                window.location.reload();;
                
            })
            .catch(error => {
                console.log(error);
            });
    };

    const deleteItem = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/binRequest/delete/${id}`);
            setAlertContent("Item deleted successfully");
            setAlertVisible(true);
            setTimeout(() => {
                setAlertVisible(false);
            }, 3000);
            window.location.reload(); // Data deleted, page will refresh automatically
        } catch (error) {
            setAlertContent("Error deleting item: " + error);
            setAlertVisible(true);
            setTimeout(() => {
                setAlertVisible(false);
            }, 3000);
            console.log(error);
        }
    };

    const handleEdit = (item) => {
        setEditItem(item);
        setModalVisible(true);
    };

    const handleCancel = () => {
        setModalVisible(false);
    };

    return (
        <div>
        
            <BinRequestHeader />
            <div style={{ margin: '0 auto', maxWidth: '1600px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {item.map((item, index) => (
                    <div key={index} style={{ backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', padding: '20px', marginBottom: '20px', width: 'calc(100% - 50px)', maxWidth: '800px', boxSizing: 'border-box', border: '2px solid #e0e0e0', transition: 'transform 0.3s ease', position: 'relative' ,height:'270px' }}>
                        <div>
                            <h2 style={{ textAlign: '', color: '#333', borderBottom: '1px solid #e0e0e0', paddingBottom: '10px', marginBottom: '10px', border: '1px solid #000000', borderRadius: '10px', padding: '10px', display: 'inline-block', width: '200px' }}><div style={{ marginLeft: '35%' }}>ALL</div></h2>
                            <p style={{ marginTop: '-60px', marginLeft: '60%', marginBottom: '20px', color: '#555' }}>Request ID : {item._id}</p>
                            <p style={{ marginLeft: '60%', marginBottom: '20px', color: '#555' }}>Created Date : {item.binRequestDate}</p>
                            <hr></hr>
                            <img src={img} style={{ height: '150px',marginTop:'5px' }} alt="Item"></img>
                            <div style={{ marginLeft: '30%', marginTop: '-17%' }}>
                                <p style={{ marginBottom: '5px', color: '#555', fontSize: '20px', fontWeight: 'bold' }}>{item.binRequestCompany}</p>
                                <p style={{ marginBottom: '5px', color: '#555', fontSize: '20px', fontWeight: 'bold' }}>Type: {item.binRequestType}</p>
                                <p style={{ marginBottom: '5px', color: '#555', fontSize: '20px', fontWeight: 'bold' }}>Location:<a href = {item.binRequestLocation} > {item.binRequestAddress}</a></p>
                            </div>
                        </div>
                        <button onClick={() => handleEdit(item)} style={{ position: 'absolute', bottom: '30px', right: '50px', backgroundColor: '#4CAF50', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', transition: 'background-color 0.3s ease' }}>More Details</button>
                    </div>
                ))}
            </div>
            {/* Alert for showing messages */}
            <Alert
                message={alertContent}
                type="success"
                showIcon
                style={{ marginBottom: '20px', display: alertVisible ? 'block' : 'none' }}
            />
            {/* Modal for more details */}
            <Modal
                title={<h2 style={{ textAlign: 'center' }}>More Details</h2>}
                width={700}
                visible={modalVisible}
                onCancel={handleCancel}
                footer={null}
            >
                <hr style={{ marginBottom: '30px' }}></hr>
                <Form
                    initialValues={editItem} // Set initial values based on editItem
                    onFinish={onFinish}
                    labelCol={{ span: 6 }} // Set label column span to 6
                    wrapperCol={{ span: 18 }} // Set wrapper column span to 18
                >
                    <Form.Item
                        name="binRequestCompany"
                        label="Company Name : "
                        rules={[{ required: true, message: 'Please enter Item ID' }]}
                    >
                        <Input placeholder="Enter Item ID" />
                    </Form.Item>

                    <Form.Item
                        name="binRequestAddress"
                        label="Adrress : "
                        rules={[{ required: true, message: 'Please enter Item Name' }]}
                    >
                        <Input placeholder="Enter Item Name" />
                    </Form.Item>

                    <Form.Item
                        name="binRequestLocation"
                        label="Location : "
                        rules={[{ required: true, message: 'Please enter Company Name' }]}
                    >
                        <Input placeholder="Enter Company Name" />
                    </Form.Item>

                    <Form.Item
                        name="binRequestType"
                        label="Type : "
                        rules={[{ required: true, message: 'Please enter Item Amount' }]}
                    >
                        <Input placeholder="Enter Item Amount" />
                    </Form.Item>

                    <Form.Item
                        name="binRequestDate"
                        label="Created Date  : "
                        rules={[{ required: true, message: 'Please enter Item Date' }]}
                    >
                        <Input placeholder="Enter Item Date" readOnly/>
                    </Form.Item>

                    <Form.Item
                        name="binRequestDescription"
                        label="Description : "
                        rules={[{ required: true, message: 'Please enter Item Description' }]}
                    >
                        <Input.TextArea placeholder="Enter Item Description" />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 6 }}>
                        <Button type="primary" htmlType="submit" style={{width:'80px',top:'20px', marginLeft: '80%',marginBottom:'-120px'}}>Apply</Button>

                        <Popconfirm
                            title="Are you sure you want to delete this item?"
                            onConfirm={() => deleteItem(editItem._id)}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button type="danger" style={{ background:'red',color: 'white', border: '1px solid red',marginLeft:'60%',marginTop:'-1000px' }}>Delete</Button>
                        </Popconfirm>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};
