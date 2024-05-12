import React, { useEffect, useState } from "react";
import { Card, Spin, Avatar, Button, Input, Form, message } from "antd";
import axios from "axios";
import { LoadingOutlined } from "@ant-design/icons";
import avatar from "../../assets/images/UserGlobal/avatar.png";
import EditSellerModal from "./EditSellerModal";
import DeleteSellerModal from "./DeleteSellerModal";

const { Meta } = Card;

const SellerProfile = () => {
  // Get the user role, id, and token from local storage
  const userRole = localStorage.getItem("role");
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const tokenWithoutBearer = token.replace("Bearer ", "");

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form] = Form.useForm();
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  // Use the useEffect hook to fetch user data when the component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Refactor the user role to match the API endpoint
        let refactoredRole = "";

        if (userRole === "seller") {
          refactoredRole = "sellar";
        } else {
          refactoredRole = userRole;
        }

        // Fetch the user data from the API
        const response = await axios.get(
          `http://localhost:5000/api/${refactoredRole}/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${tokenWithoutBearer}`,
            },
          }
        );

        // Set the user data to the formik values
        setUser(response.data.seller);
        console.log(response.data.seller);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user by ID:", error);
        message.error("Error fetching user");
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId, token]);

  const handleEditSellerModalOpen = () => {
    setEditModalVisible(true);
  };

  const handleEditSellerModalCancel = () => {
    setEditModalVisible(false);
    window.location.reload();
  };

  const handleDeleteSellerModalOpen = () => {
    setDeleteModalVisible(true);
  };

  const handleDeleteSellerModalCancel = () => {
    setDeleteModalVisible(false);
  };

  // Display the user profile card with skeleton loading spinner while the user data is being fetched
  return (
    <div style={{ marginTop: "50px" }}>
      {loading ? (
        <Spin
          indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          size="large"
        />
      ) : user ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: 20 }}>
            <Avatar size={150} src={avatar} />
          </div>
          <Card
            style={{
              width: 600,
              margin: "0 auto 20px auto",
              boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
            }}
            loading={loading}
          >
            <Meta
              title="User Information"
              description={
                <>
                  <Form form={form} layout="vertical">
                    <Form.Item label="First Name">
                      <Input value={user.firstName} readOnly />
                    </Form.Item>
                    <Form.Item label="Last Name">
                      <Input value={user.lastName} readOnly />
                    </Form.Item>
                    <Form.Item label="Email">
                      <Input value={user.user.email} readOnly />
                    </Form.Item>
                    <Form.Item label="Phone">
                      <Input value={user.phone} readOnly />
                    </Form.Item>
                    <Form.Item label="Address">
                      <Input value={user.address} readOnly />
                    </Form.Item>
                  </Form>
                  <Button
                    type="primary"
                    onClick={handleEditSellerModalOpen}
                    style={{
                      marginRight: "5px",
                      borderRadius: "5px",
                      float: "right",
                    }}
                  >
                    Update
                  </Button>
                </>
              }
            />
          </Card>
          <Button
            danger
            onClick={handleDeleteSellerModalOpen}
            style={{
              marginRight: "5px",
              borderRadius: "5px",
              width: "200px",
            }}
          >
            Delete Account
          </Button>
        </div>
      ) : (
        <div>No user found</div>
      )}
      {/* Edit User Modal */}
      <EditSellerModal
        userId={userId}
        userData={user}
        visible={editModalVisible}
        onCancel={handleEditSellerModalCancel}
        onUpdate={handleEditSellerModalOpen}
      />
      {/* Delete User Modal */}
      <DeleteSellerModal
        userId={userId}
        visible={deleteModalVisible}
        onCancel={handleDeleteSellerModalCancel}
        onDelete={handleDeleteSellerModalOpen}
      />
    </div>
  );
};

export default SellerProfile;
