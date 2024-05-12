import React, { useState, useEffect } from 'react';
import axios from "axios";
import ItemAddForm from "./ItemAddForm";
import HeaderComponent from "../../partials/Header";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";
import { Modal, Button, Typography, Form, Input } from 'antd';
import Footer from '../../partials/NewFooter'

const { Title } = Typography;

export default function Item() {
    const [item, setItem] = useState([]);
    const [visible, setVisible] = useState(false); // State to manage modal visibility
    const [editItem, setEditItem] = useState(null); // State to store item being edited
    const navigate = useNavigate();

    useEffect(() => {
        function getItem() {
            axios.get("http://localhost:5000/api/store/getall")
                .then((res) => {
                    console.log(res.data)
                    setItem(res.data);
                })
                .catch((err) => {
                    alert(err.message);
                });
        }
        getItem();
    }, []);

    const onFinish = (values) => {
        axios.put(`http://localhost:5000/api/store/update/${editItem._id}`, values)
            .then(response => {
                console.log(response.data);
                setVisible(false);
                alert("Successfully updated");
                window.location.reload();

            })
            .catch(error => {
                console.log(error);
            });
    };
    
    

    const deleteItem = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/store/deleteitem/${id}`);
            window.location.reload(); //data deleted after that page will refresh automatically
        } catch (error) {
            alert('Error deleting data', error);
            console.log(error);
        }
    };

    const handleEdit = (item) => {
        setEditItem(item);
        setVisible(true);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    const nextPage = () => {
        navigate("/reportPage");
    };

    return (
        <div>
            <div>
            </div>
            <div>
                <div style={{ fontSize:'30px' ,marginBottom:'-35px'}}>Manage shop items</div>
            </div>
            <div style={{ position: 'relative', top: '0px', right: '160px', zIndex: '999' ,marginBottom:'-5px'}}>
                <ItemAddForm />
            </div>

            <div style={{ position: 'absolute', right: '62px', zIndex: '999', top: '132px' }}>
                <button onClick={nextPage} style={{ width: '150px', height: '35px', padding: '5px', backgroundColor: 'white', color: '#fff', border: '1px solid black', borderRadius: '5px', cursor: 'pointer', fontSize: '14px' }}>
                    <div style={{color:'black'}}>
                  
                    <FontAwesomeIcon icon={faFileAlt} style={{ marginRight: '5px' }} /> Generate Report

                    </div> 
                </button>
            </div>

            <hr style={{ marginBottom: '60px', marginTop: '20px' }} />

            <div style={{ margin: '0 auto', maxWidth: '1200px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                {item.map((item, index) => (
                    <div key={index} style={{ backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', padding: '20px', marginBottom: '20px', width: 'calc(33.33% - 40px)', maxWidth: '400px', marginRight: '8px', marginLeft: '10px', boxSizing: 'border-box', flex: '1 0 30%', border: '2px solid #e0e0e0', transition: 'transform 0.3s ease', cursor: 'pointer' }}>
                        <div>
                            
                            <h2 style={{ textAlign: 'center', color: '#333', borderBottom: '1px solid #e0e0e0', paddingBottom: '10px', marginBottom: '10px' }}>{item.itemName}</h2>

                            <img src={`/images/${item.itemImage}`}alt="Item" style={{height:'80px',width: '30%', borderRadius: '5px', marginBottom: '-60px',marginLeft:'220px', position:'relative'}} />
                            <p style={{ marginBottom: '5px', color: '#555' }}>Company: {item.companyName}</p>
                            <p style={{ marginBottom: '5px', color: '#555' }}>Item Id: {item.itemId}</p>
                            <p style={{ marginBottom: '5px', color: '#555' }}>Amount: {item.itemAmount}</p>
                            <p style={{ marginBottom: '20px', color: '#555' }}>Description: {item.itemDescription}</p>
                           
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <button onClick={() => handleEdit(item)} style={{ marginRight: '10px', backgroundColor: '#4CAF50', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', transition: '0.3s' }}>
                                &#9998; {/* Edit icon */}
                            </button>
                            <button onClick={() => {
                                if (window.confirm('Are you sure you want to delete this item?')) {
                                    deleteItem(item._id);
                                }
                            }} style={{ backgroundColor: '#f44336', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', transition: '0.3s' }}>
                                &#128465; {/* Trash icon */}
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal for editing item */}
            <Modal
    title={<h2 style={{textAlign: 'center'}}>Update Item</h2>}
    width={700}
    visible={visible}
    onCancel={handleCancel}
    footer={null}
>
    <hr style={{marginBottom:'30px'}}></hr>
    <Form
        initialValues={editItem} // Set initial values based on editItem
        onFinish={onFinish}
        labelCol={{ span: 6 }} // Set label column span to 6
        wrapperCol={{ span: 18 }} // Set wrapper column span to 18
    >
        <Form.Item
            name="itemId"
            label="Item ID"
            rules={[{ required: true, message: 'Please enter Item ID' }]}
        >
            <Input placeholder="Enter Item ID" />
        </Form.Item>

        <Form.Item
            name="itemName"
            label="Item Name"
            rules={[{ required: true, message: 'Please enter Item Name' }]}
        >
            <Input placeholder="Enter Item Name" />
        </Form.Item>

        <Form.Item
            name="companyName"
            label="Company Name"
            rules={[{ required: true, message: 'Please enter Company Name' }]}
        >
            <Input placeholder="Enter Company Name" />
        </Form.Item>

        <Form.Item
            name="itemAmount"
            label="Item Amount"
            rules={[{ required: true, message: 'Please enter Item Amount' }]}
        >
            <Input placeholder="Enter Item Amount" />
        </Form.Item>

        <Form.Item
            name="itemDescription"
            label="Item Description"
            rules={[{ required: true, message: 'Please enter Item Description' }]}
        >
            <Input.TextArea placeholder="Enter Item Description" />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 6 }}>
            <Button type="primary" htmlType="submit" style={{marginLeft:'80%'}}>Confirm</Button>
        </Form.Item>
    </Form>
</Modal>




        </div>
    );
};
