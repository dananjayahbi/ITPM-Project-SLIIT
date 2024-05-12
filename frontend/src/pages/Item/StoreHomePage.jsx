import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faSearch } from "@fortawesome/free-solid-svg-icons";
import img1 from "./pics/pic1.jpg";
import img2 from "./pics/pic2.jpg";
import img3 from "./pics/pic3.jpg";
import Footer from "../../partials/NewFooter";
import Header from "../../partials/Header";

export default function Homescreen() {
  const [items, setItems] = useState([]);
  const [currentImage, setCurrentImage] = useState(0);
  const images = [img1, img2, img3]; // Add more images as needed
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    window.voiceflow.chat.load({
      verify: { projectID: '661941f0ac2c4721d7306dc6' },
      url: 'https://general-runtime.voiceflow.com',
      versionID: 'production'
    });
  }, []);

  useEffect(() => {
    function getItems() {
      axios
        .get("http://localhost:5000/api/store/getall")
        .then((res) => {
          setItems(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    getItems();
  }, []);

  const filteredItems = items.filter((item) => {
    return item.itemName.toLowerCase().includes(searchQuery.toLowerCase());
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((current) => (current + 1) % images.length);
    }, 5000); // Change image every 5 seconds (5000 milliseconds)

    return () => clearInterval(interval);
  }, []);

    // //Setting Cart Items in localStorage
  // const setCartItems = (items) => {
  //   localStorage.setItem("cartItems", JSON.stringify(items));
  // };

  // Getting Cart Items from localStorage
  const cartItems = JSON.parse(localStorage.getItem("cartItems"));
  console.log(cartItems);

  // Remove "cartItems" from localStorage
  // localStorage.removeItem("cartItems");

  return (
    <div style={{ backgroundColor: "#f5f5f5" }}>
      <Header />

      <div
        style={{
          backgroundColor: "#8BC34A",
          color: "#fff",
          padding: "10px",
          marginTop: "20px",
        }}
      >
        <div style={{ maxWidth: "100%", margin: "0 auto", padding: "0 20px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div></div>
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
                onClick={() => {
                  window.location.href = "/store/cart";
                }}
              >
                <FontAwesomeIcon
                  icon={faShoppingCart}
                  style={{ marginRight: "5px" }}
                />
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          width: "100%",
          position: "relative",
          height: "600px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src={images[currentImage]}
          alt="Banner Image"
          style={{
            width: "100vw",
            maxWidth: "100%",
            height: "100%",
            objectFit: "cover",
            backgroundColor: "#e8f4f8",
          }}
        />
      </div>

      <center>
        <h1
          style={{
            marginTop: "50px",
            marginBottom: "40px",
            fontSize: "2em",
            fontFamily: "Arial, sans-serif",
            fontWeight: "bold",
          }}
        >
          Recently Added
        </h1>
        <div style={{ position: "relative" }}>
          <input
            type="text"
            placeholder="Search item..."
            style={{
              width: "100%",
              maxWidth: "500px",
              padding: "10px",
              borderRadius: "20px",
              border: "1px solid black",
              marginRight: "10px",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
              marginBottom: "20px",
            }}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FontAwesomeIcon
            style={{
              position: "absolute",
              top: "50%",
              right: "1%",
              transform: "translateY(-50%)",
              color: "#888",
            }}
          />
        </div>
      </center>

      <div
        style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}
      >
        {filteredItems.map((item, index) => (
          <div
            key={index}
            style={{
              margin: "10px",
              width: "250px",
              height: "380px",
              position: "relative",
            }}
          >
            <div
              style={{
                boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
                borderRadius: "5px",
                padding: "15px",
                border: "2px solid #ccc",
                backgroundColor: "#ffffff",
                transition: "box-shadow 0.3s, border 0.3s",
                cursor: "pointer",
                width: "100%",
                height: "100%",
              }}
            >
              <h2 style={{ textAlign: "center", marginBottom: "10px" }}>
                {item.itemName}
              </h2>
              <img
                src={`/images/${item.itemImage}`}
                alt="Item"
                style={{ width: "100%", borderRadius: "5px" }}
              />
              <p
                style={{
                  textAlign: "center",
                  marginTop: "10px",
                  marginBottom: "5px",
                }}
              >
                {" "}
                <strong></strong> {item.companyName}
              </p>
              <p style={{ textAlign: "center", marginBottom: "5px" }}>
                <strong></strong> Rs {item.itemAmount}
              </p>
              {/* "View More" button */}
              <a
                href={"description/" + item._id}
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  position: "absolute",
                  bottom: "10px",
                  left: "50%",
                  transform: "translateX(-50%)",
                }}
              >
                <button
                  style={{
                    padding: "5px 10px",
                    borderRadius: "3px",
                    backgroundColor: "#007bff",
                    color: "#fff",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  View More
                </button>
              </a>
            </div>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
}
