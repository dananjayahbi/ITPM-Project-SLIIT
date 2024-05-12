import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Button, message } from "antd";
import axios from "axios";

const EditSellerModal = ({ visible, onCancel, userId, userData, onUpdate }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const setUserDetails = async () => {
      // Set form values with the fetched user data
      form.setFieldsValue({
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.user.email,
        phone: userData.phone,
        address: userData.address,
      });
    };

    if (visible && userData) {
      setUserDetails();
    }
  }, [userData, visible, form]);

  // Update the data
  const onFinish = async (values) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token").replace("Bearer ", "");

      if (!token) {
        console.error("Authentication token not found");
        return;
      }

      const response = await axios.put(
        `http://localhost:5000/api/sellar/${userId}`,
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Server response:", response.data);

      if (response.status === 200) {
        console.log("User updated successfully");
        message.success("User updated successfully!");
        onUpdate();
        onCancel();
      } else {
        console.error("Unexpected server response:", response);
        message.error("Failed to update user!");
      }
    } catch (error) {
      console.error("Error updating user:", error.response.data);
      message.error("Failed to update user!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Edit User"
      visible={visible}
      onCancel={onCancel}
      style={{ top: 20}}
      footer={[
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={form.submit}
            style={{ borderRadius: "5px", float: "right", marginTop: "-30px" }}
          >
            Update
          </Button>,
          <Button
            key="back" 
            onClick={onCancel}
            style={{ marginRight: "5px", borderRadius: "5px", float: "right", marginTop: "-30px" }}
          >
            Cancel
          </Button>
      ]}
    >
      <Form form={form} onFinish={onFinish} layout="vertical" style={{height:"450px"}}>
        <Form.Item
          name="firstName"
          label="First Name"
          rules={[{ required: true, message: "Please enter the full name" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="lastName"
          label="Last Name"
          rules={[{ required: true, message: "Please enter the last name" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, message: "Please enter the email" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          hasFeedback
          label="Phone"
          name="phone"
          rules={[
            {
              required: true,
              message: "Please enter the phone number!",
            },
            {
              pattern: new RegExp("^[0-9]{10}$"),
              message: "Please enter a valid phone number!",
            },
            {
              max: 10,
              message: "Phone number must be 10 digits long!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="address"
          label="Address"
          rules={[{ required: true, message: "Please enter the address" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditSellerModal;
