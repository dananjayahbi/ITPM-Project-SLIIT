import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Button, message } from "antd";
import axios from "axios";

const EditCompanyModal = ({
  visible,
  onCancel,
  userId,
  userData,
  onUpdate,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const setUserDetails = async () => {
      // Set form values with the fetched user data
      form.setFieldsValue({
        companyName: userData.companyName,
        email: userData.email,
        companySlogan: userData.companySlogan,
        companyAbout: userData.companyAbout,
        openHours: userData.openHours,
        closeHours: userData.closeHours,
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
        `http://localhost:5000/api/company/${userId}`,
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
      style={{ top: 20 }}
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
          style={{
            marginRight: "5px",
            borderRadius: "5px",
            float: "right",
            marginTop: "-30px",
          }}
        >
          Cancel
        </Button>,
      ]}
    >
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        style={{ height: "535px" }}
      >
        <Form.Item
          name="companyName"
          label="Company Name"
          rules={[{ required: true, message: "Please enter the Company Name" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, message: "Please enter the Email" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="companySlogan"
          label="Company Slogan"
          rules={[
            { required: true, message: "Please enter the company slogan" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="companyAbout"
          label="Company About"
          rules={[{ required: true, message: "Please enter the NIC" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="openHours"
          label="Open Hours"
          rules={[{ required: true, message: "Please enter the open hours" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="closeHours"
          label="Close Hours"
          rules={[{ required: true, message: "Please enter the close hours" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditCompanyModal;
