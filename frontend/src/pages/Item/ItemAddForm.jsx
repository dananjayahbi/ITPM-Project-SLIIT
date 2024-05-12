import React, { useState } from "react";
import { Modal, Button, Form, Input } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";

const ItemAddForm = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState(null); // State to hold the selected image file
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm(); // Initialize form instance

  const sendData = async (values) => {
    try {
      const formData = new FormData(); // Create a new FormData object
      formData.append("itemImage", image); // Append the image file to FormData

      // Append other form values to FormData
      for (const key in values) {
        formData.append(key, values[key]);
      }

      await axios.post("http://localhost:5000/api/store/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Set Content-Type to multipart/form-data
        },
      });

      form.resetFields(); // Reset form fields
      setOpen(false);
      console.log("Form Values:", values);
      alert("Form Submitted");
      window.location.reload(); // Reload the page after form submission (you might want to consider a better way to handle this)
    } catch (err) {
      alert(err);
    }
  };

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    form.resetFields(); // Reset form fields
    setOpen(false);
  };

  return (
    <div style={{ textAlign: 'right'}}>
        <Button type="primary" onClick={showModal} style={{ width: '120px', height: '35px' }}>
         <div style={{marginLeft:'-5px' , fontSize:'12px'}}>   <PlusOutlined /> Add New Item</div>
    
      </Button>
      <Modal
        visible={open}
        title={<h2 style={{ textAlign: "center" }}>Add New Item</h2>}
        onCancel={handleCancel}
        footer={null}
        width={700}
      >
        <hr />

        <Form
          form={form} // Pass form instance to Form component
          layout="vertical"
          onFinish={sendData}
          encType="multipart/form-data"
          initialValues={{
            itemId: "",
            itemName: "",
            companyName: "",
            itemAmount: "",
            itemDescription: "",
            itemImage: "",
          }}
        >
          <Form.Item
            label="Item ID"
            name="itemId"
            rules={[{ required: true, message: "Please enter Item ID" }]}
          >
            <Input maxLength={20} placeholder="Enter Item ID" />
          </Form.Item>

          <Form.Item
            label="Item Name"
            name="itemName"
            rules={[{ required: true, message: "Please enter Item Name" }]}
          >
            <Input placeholder="Enter Item Name" />
          </Form.Item>

          <Form.Item
            label="Company Name"
            name="companyName"
            rules={[{ required: true, message: "Please enter Company Name" }]}
          >
            <Input placeholder="Enter Company Name" />
          </Form.Item>

          <Form.Item
            label="Item Amount"
            name="itemAmount"
            rules={[
              { required: true, message: "Please enter Item Amount" },
              {
                pattern: /^[0-9]+$/,
                message: "Please enter valid Item Amount",
              },
            ]}
          >
            <Input placeholder="Enter Item Amount" />
          </Form.Item>

          <Form.Item
            label="Item Description"
            name="itemDescription"
            rules={[
              { required: true, message: "Please enter Item Description" },
            ]}
          >
            <Input.TextArea placeholder="Enter Item Description" />
          </Form.Item>

          <input
            type="file"
            required="true"
            name="itemImage"
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
          />

          <Form.Item style={{ textAlign: "right" }}>
            <Button onClick={handleCancel} style={{ marginRight: 8 }}>
              Cancel
            </Button>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ItemAddForm;
