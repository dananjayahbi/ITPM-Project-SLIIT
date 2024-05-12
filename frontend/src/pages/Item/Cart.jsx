import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Card, Row, Col, Typography, List, Button, Empty, message, Modal } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const { Title } = Typography;

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const items = localStorage.getItem("cartItems");
    if (items) {
      setCartItems(JSON.parse(items));
    }
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    const token = localStorage.getItem("token").replace("Bearer ", "");
    const userID = localStorage.getItem("userId");
    try {
      const response = await axios.get(`http://localhost:5000/api/sellar/${userID}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setUser(response.data.seller);
    } catch (error) {
      console.error("Failed to fetch user data", error);
    }
  };

  const handleCheckout = async () => {
    const totalCost = calculateTotal();
    if (user.creditsBalance < totalCost) {
      message.error("Insufficient credits");
      return;
    }

    const updatedBoughtItems = cartItems.map(item => ({
      item: item.itemID,
      quantity: item.itemCount,
      date: new Date().toISOString()
    }));

    const activityHistory = {
      type: "spend",
      amount: totalCost,
      date: new Date().toISOString()
    };

    const token = localStorage.getItem("token").replace("Bearer ", "");
    const userID = localStorage.getItem("userId");
    setIsLoading(true);

    try {
      await axios.put(`http://localhost:5000/api/sellar/${userID}`, {
        creditsBalance: user.creditsBalance - totalCost,
        boughtItems: [...user.boughtItems, ...updatedBoughtItems],
        activityHistory: [...user.activityHistory, activityHistory]
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setCartItems([]);
      localStorage.removeItem("cartItems");
      message.success("Checkout successful!");
      fetchUserData(); // Refresh user data
    } catch (error) {
      console.error("Checkout failed", error);
      message.error("Checkout failed");
    } finally {
      setIsLoading(false);
    }
  };

  // Checkout confirmation modal
  const handleCheckoutConfirmation = () => {
    Modal.confirm({
      title: "Confirm Checkout",
      content: "Are you sure you want to proceed with the checkout?",
      onOk: handleCheckout,
      onCancel: () => {},
    });
  };


  const checkCartEmpty = () => {
    // check the "cartItems" in localStorage has any items. If not, return true
    if (cartItems.length === 0) {
      return true;
    }
  };

  const handleAddItemsButton = () => {
    // Navigate to the shop page
    window.location.href = "/store";
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (acc, item) => acc + item.itemAmount * item.itemCount,
      0
    );
  };

  const totalItems = () => {
    return cartItems.reduce((acc, item) => acc + item.itemCount, 0);
  };

  const removeItem = (itemName) => {
    const newCartItems = cartItems.filter((item) => item.itemName !== itemName);
    setCartItems(newCartItems);
    localStorage.setItem("cartItems", JSON.stringify(newCartItems));
  };

  // Increase the quantity of the item
  const handleIncrement = (itemName) => {
    const newCartItems = cartItems.map((item) => {
      if (item.itemName === itemName) {
        item.itemCount += 1;
      }
      return item;
    });
    setCartItems(newCartItems);
    localStorage.setItem("cartItems", JSON.stringify(newCartItems));
  };

  // Decrease the quantity of the item
  const handleDecrement = (itemName) => {
    const newCartItems = cartItems.map((item) => {
      if (item.itemName === itemName) {
        if (item.itemCount > 1) {
          item.itemCount -= 1;
        }
      }
      return item;
    });
    setCartItems(newCartItems);
    localStorage.setItem("cartItems", JSON.stringify(newCartItems));
  };

  // Clear the cart
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cartItems");
  };

  return (
    <Row gutter={16}>
      <Col span={16}>
        {checkCartEmpty() ? (
          <Empty
            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
            imageStyle={{
              height: 60,
            }}
          >
            <Button type="primary" onClick={handleAddItemsButton}>
              Add Items
            </Button>
          </Empty>
        ) : (
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                margin: "5px 5px",
              }}
            >
              <Title level={4}>Cart Items</Title>
              <div>
                <Button
                  type="primary"
                  style={{ marginRight: "5px" }}
                  onClick={handleAddItemsButton}
                >
                  Add Items
                </Button>
                <Button onClick={clearCart}>Clear Cart</Button>
              </div>
            </div>
            <List
              grid={{ gutter: 16, column: 1 }}
              dataSource={cartItems}
              renderItem={(item) => (
                <List.Item>
                  <Card title={item.itemName}>
                    <div style={{ display: "flex" }}>
                      <div style={{ marginRight: "30px" }}>
                        <img
                          alt={item.itemName}
                          src={item.itemImageLocation}
                          style={{ width: "100px" }}
                        />
                      </div>
                      <div>
                        <p>Company: {item.companyName}</p>
                        <p>Price per item: {item.itemAmount} Cr</p>
                        <p>Quantity: {item.itemCount}</p>
                        <p>Total: {item.itemAmount * item.itemCount} Cr</p>
                      </div>
                    </div>
                    <div style={{ display: "flex", float: "right" }}>
                      <div style={{ marginRight: "20px" }}>
                        <Button
                          style={{ marginRight: "3px" }}
                          onClick={() => handleIncrement(item.itemName)}
                        >
                          +
                        </Button>
                        <Button onClick={() => handleDecrement(item.itemName)}>
                          -
                        </Button>
                      </div>
                      <Button
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => removeItem(item.itemName)}
                      ></Button>
                    </div>
                  </Card>
                </List.Item>
              )}
            />
          </div>
        )}
      </Col>
      <Col span={8}>
        <div style={{ padding: 20, background: "#f7f7f7", height: "100%" }}>
          <Title level={4}>Cart Summary</Title>
          <p style={{ fontSize: "18px" }}>Total Items: {totalItems()}</p>
          <p style={{ fontSize: "18px" }}>
            Total Amount: {calculateTotal()} Cr
          </p>
          <Button
            type="primary"
            style={{ width: "100%", marginTop: "20px" }}
            onClick={handleCheckoutConfirmation}
            loading={isLoading}
            disabled={checkCartEmpty()}
          >
            Checkout
          </Button>
        </div>
      </Col>
    </Row>
  );
};

export default Cart;
