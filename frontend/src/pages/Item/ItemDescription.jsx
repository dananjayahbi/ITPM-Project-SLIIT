import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import img from "./pics/download.jpeg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faSearch } from "@fortawesome/free-solid-svg-icons";
import Header from "../../partials/Header";
import { message } from "antd";
import Footer from "../../partials/NewFooter";

const ItemDescription = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [itemID, setitemID] = useState("")
  const [itemName, setitemName] = useState("");
  const [itemImage, setitemImage] = useState("");
  const [companyName, setcompanyName] = useState("");
  const [itemAmount, setitemAmount] = useState("");
  const [itemDescription, setitemDescription] = useState("");
  const [itemCount, setItemCount] = useState(1);

  console.log(itemImage)

  const handleIncrement = () => {
    setItemCount(itemCount + 1);
  };

  const handleDecrement = () => {
    if (itemCount > 1) {
      setItemCount(itemCount - 1);
    }
  };

  useEffect(() => {
    axios.get(`http://localhost:5000/api/store/get/${id}`).then((response) => {
      const item = response.data;
      setitemID(item._id);
      setitemName(item.itemName);
      setcompanyName(item.companyName);
      setitemAmount(item.itemAmount);
      setitemImage(item.itemImage);
      setitemDescription(item.itemDescription);

      console.log(response.data);
    });
  }, [id]);

  // Adding item to "cartItems" in localStorage
  const addToCart = (itemID, itemName, itemImage, companyName, itemAmount, itemCount) => {
    const itemImageLocation = `/images/${itemImage}`;
    const item = {itemID, itemName, itemImageLocation, companyName, itemAmount, itemCount };
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const existingItem = cartItems.find(
      (cartItem) => cartItem.itemName === item.itemName
    );

    if (existingItem) {
      existingItem.itemCount += item.itemCount;
    } else {
      cartItems.push({ ...item });
    }

    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };

  const handleAddToCart = () => {
    // Here you can implement the logic to add the item to the cart
    addToCart(itemID, itemName, itemImage, companyName, itemAmount, itemCount);
    message.success(`Added ${itemCount} item(s) to the cart`);
  };

  return (
    <div>
      <Header />
      <div
        style={{ backgroundColor: "#8BC34A", color: "#fff", padding: "10px" }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          <div>
            <h1 style={{ margin: 0 }}>ECO-LITE</h1>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}></div>
          <div>
            <button
              style={{
                padding: "10px 15px",
                backgroundColor: "#008CBA",
                color: "white",
                border: "none",
                borderRadius: "20px",
                cursor: "pointer",
              }}
              onClick={() => navigate("/store/cart")}
            >
              <FontAwesomeIcon
                icon={faShoppingCart}
                style={{ marginRight: "5px" }}
              />
              Cart
            </button>
          </div>
        </div>
      </div>

      <div style={{ marginLeft: "5%", marginRight: "5%" }}>
        <p
          className="form-control"
          style={{
            position: "relative",
            ontWeight: "bold",
            fontSize: "4rem",
            marginBottom: "3rem",
            marginLeft: "1rem",
          }}
        >
          {itemName}
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={`/images/${itemImage}`}
            style={{ width: "40%", maxWidth: "300px", marginRight: "1rem" }}
            alt="Item"
          />
          <div>
            <p
              className="form-control"
              style={{
                fontSize: "1.5rem",
                marginBottom: "1rem",
                marginTop: "4rem",
              }}
            >
              {itemDescription}
            </p>
            <p
              className="form-control"
              style={{
                fontSize: "2rem",
                fontWeight: "bold",
                marginBottom: "1rem",
              }}
            >
              Cr: {itemAmount}
            </p>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div
                style={{
                  marginRight: "1rem",
                  fontSize: "2rem",
                  fontWeight: "bold",
                  border: "2px solid #ccc",
                  padding: "0.5rem",
                  borderRadius: "1rem",
                }}
              >
                <button
                  onClick={handleDecrement}
                  style={{
                    padding: "0.5rem 1rem",
                    fontSize: "1.5rem",
                    border: "none",
                    background: "none",
                    cursor: "pointer",
                  }}
                >
                  -
                </button>
                <span style={{ margin: "0 0.5rem", fontSize: "2rem" }}>
                  {itemCount}
                </span>
                <button
                  onClick={handleIncrement}
                  style={{
                    padding: "0.5rem 1rem",
                    fontSize: "1.5rem",
                    border: "none",
                    background: "none",
                    cursor: "pointer",
                  }}
                >
                  +
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                style={{
                  padding: "1rem 1.5rem",
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  border: "none",
                  background: "#007bff",
                  color: "#fff",
                  borderRadius: "1rem",
                  cursor: "pointer",
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ItemDescription;