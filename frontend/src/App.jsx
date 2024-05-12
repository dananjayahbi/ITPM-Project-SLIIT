import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import "./App.css";
import { ConfigProvider } from "antd";
import Dashboard from "./pages/Dashboard";
import Landing from "./pages/landing";
import Login from "./pages/Login";
import SellerRegister from "./pages/SellerRegister";
import BuyerRegister from "./pages/BuyerRegister";
import ItemAddForm from "./pages/Item/ItemAddForm";
import Store from "./pages/Item/StoreHomePage";
import ItemDescription from "./pages/Item/ItemDescription";

import BinRequest from "./pages/BinRequest/binRequest";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import Sellars from "./pages/Seller/AllSellar";
import Home from "./pages/Home";
import Splash from "./pages/Splash";

function App() {
  const isLogged = window.localStorage.getItem("LoggedIn");
  const role = window.localStorage.getItem("role");

  const theme = {
    token: {
      // Seed Token
      colorPrimary: "#00b96b",

      // Alias Token
      colorBgContainer: "#fff",
    },
  };

  return (
    <>
      <ConfigProvider theme={theme}>
        <Routes>
          {isLogged ? (
            <>
              {role === "admin" ? (
                <Route path="*" element={<AdminDashboard />} />
              ) : (
                <Route path="*" element={<Dashboard />} />
              )}
            </>
          ) : (
            <>
              <Route path="*" element={<Navigate to="/login" />} />
            </>
          )}
          <Route path="/landing" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/seller-register" element={<SellerRegister />} />
          <Route path="/buyer-register" element={<BuyerRegister />} />
          <Route path="/sellars" element={<Sellars />} />
          <Route path="/home" element={<Home />} />
          <Route path="/splash" element={<Splash />} />
          <Route path="/itemAdd" element={<ItemAddForm />} />
          <Route path="/store" element={<Store />} />
          <Route path="/description/:id" element={<ItemDescription />} />
          <Route path="/binRequest" element={<BinRequest />} />
        </Routes>
      </ConfigProvider>
    </>
  );
}

export default App;
