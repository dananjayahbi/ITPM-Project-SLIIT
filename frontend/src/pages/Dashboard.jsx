import React, { useState } from "react";
import { Routes, Route, Navigate, useParams } from "react-router-dom";
import { Layout } from "antd";
import SideMenu from "../partials/SideMenu";
import {
  HomeOutlined,
  UserOutlined,
  DollarOutlined,
  CalendarOutlined,
  SettingOutlined,
  SendOutlined,
  EnvironmentOutlined,
  ShopOutlined,
  BankOutlined,
  RobotOutlined,
  QuestionCircleOutlined
} from "@ant-design/icons";
import SellerDashboard from "./Seller/SellerDashboard";
import HeaderComponent from "../partials/Header";
import Footer from "../partials/Footer";
import AdminDashborad from "../pages/Admin/AdminDashboard";
import CompanyDashborad from "../pages/Company/companyDashboard";
import Earnings from "../pages/Payments/Earnings";
import Calender from "../pages/Others/Calender";
import SellerProfile from "../pages/Seller/SellerProfile";
import CompanyProfile from "../pages/Company/CompanyProfile";
import AdminProfile from "../pages/Admin/AdminProfile";
import Settings from "../pages/Settings/Settings";
import ErrorPageTest from "../pages/ErrorPages/ErrorPageTest";
import Buyers from "../pages/Company/CompanyAll/AllCompany";
import Sellars from "../pages/Seller/AllSellar";
import Ranking from "../pages/Company/Company Ranking/CompanyRanking";
import CompanyUpdate from "../pages/Company/EditCompany";
import Bins from "../pages/Bin/AllBin";
import CreateBin from "../pages/Bin/CreateBin";
import ReadBin from "../pages/Bin/ReadBin";
import UpdateBin from "../pages/Bin/UpdateBin";
import BinHomePage from "../pages/Bin/Binhome";
import CusViewBins from "../pages/Bin/CusViewBins";
import BinRequestAdmin from "../pages/BinRequest/adminBinRequest";
import PendingBinRequestAdmin from "../pages/BinRequest/adminBinPending";
import AcceptedBinRequestAdmin from "../pages/BinRequest/acceptedBinRequest";
import RejectedBinRequestAdmin from "../pages/BinRequest/rejectedBinRequest";
import CompanyItem from "../pages/Item/CompanyItem";
import ReportPage from "../pages/Item/ReportPage";


import Cart from "../pages/Item/Cart";
import SubscribedSellars from "../pages/Company/Subscribed Sellars/SubscribedSellars";

const { Sider, Content } = Layout;

const Dashboard = () => {

  const role = window.localStorage.getItem("role");
  const companyId = window.localStorage.getItem("userId");

  const getMenuItems = () => {
    if (role === "seller") {
      return [
        {
          label: "Dashboard",
          path: "/dashboard",
          icon: HomeOutlined,
        },
        {
          label: "Earnings",
          path: "/earnings",
          icon: DollarOutlined,
        },
        {
          label: "Calendar",
          path: "/calendar",
          icon: CalendarOutlined,
        },
        {
          label: "Your Details",
          path: "/yourDetails",
          icon: UserOutlined,
        },
        {
          label: "Settings",
          path: "/settings",
          icon: SettingOutlined,
        },
      ];
    } else if (role === "company") {
      return [
        {
          label: "Dashboard",
          path: "/dashboard",
          icon: HomeOutlined,
        },
        {
          label: "Requests",
          path: "/binRequestAdmin",
          icon: SendOutlined,
        },
        {
          label: "Bins",
          path: "/binall",
          icon: EnvironmentOutlined,
        },
        {
          label: "Customers",
          path: `/subscribedsellars/${companyId}`,
          icon: UserOutlined,
        },
        {
          label: "Payments",
          path: "/payments",
          icon: DollarOutlined,
        },
        {
          label: "Account",
          path: `/company/${companyId}`,
          icon: SettingOutlined,
        },
        {
          label: "Shop",
          path: "/companyItem",
          icon: BankOutlined,
        },
      ];
    } else {
      return [];
    }
  };
  const menuItems = getMenuItems();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <HeaderComponent />
      <Layout style={{ padding: "15px 24px 24px" }}>
        <Sider width={265} style={{ backgroundColor: "#f5f5f5" }}>
          <SideMenu menuItems={menuItems} />
        </Sider>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" />} />

            {role == "admin" ? (
              <Route path="/dashboard" element={<AdminDashborad />} />
            ) : role == "company" ? (
              <>
                <Route path="/dashboard" element={<CompanyDashborad />} />
                <Route
                  path={`/company/:companyId`}
                  element={<CompanyProfile />}
                />
                <Route
                  path="/company/:companyId/update"
                  element={<CompanyUpdate />}
                />
                <Route
                  path="/subscribedsellars/:companyId"
                  element={<SubscribedSellars />}
                />

                <Route path="/binall" element={<Bins />} />
                <Route path="/createbin" element={<CreateBin />} />
                <Route path="/getbin/:id" element={<ReadBin />} />
                <Route path="/updatebin/:id" element={<UpdateBin />} />
                <Route path="/Binhome" element={<BinHomePage />} />
                <Route path="/CusViewBins" element={<CusViewBins />} />
              </>
            ) : role == "seller" ? (
              <Route path="/dashboard" element={<SellerDashboard />} />
            ) : (
              <Navigate to="/login" />
            )}

            <Route path="/earnings" element={<Earnings />} />
            <Route path="/calender" element={<Calender />} />

            <Route path="/buyers" element={<Buyers />} />
            <Route path="/sellars" element={<Sellars />} />
            <Route path="/ranking" element={<Ranking />} />
            <Route path="/binRequestAdmin" element={<BinRequestAdmin/>} />
            <Route path="binRequestPending" element={<PendingBinRequestAdmin/>} />
            <Route path="acceptedBinRequest" element={<AcceptedBinRequestAdmin/>} />
            <Route path="/rejectedBinRequestAdmin" element={<RejectedBinRequestAdmin/>} />
            <Route path="/companyItem" element={<CompanyItem/>} />
            <Route path="/reportPage" element={<ReportPage/>} />
            <Route path="/store/cart" element={<Cart />} />

            {role == "admin" ? (
              <Route path="/yourDetails" element={<AdminProfile />} />
            ) : role == "seller" ? (
              <Route path="/yourDetails" element={<SellerProfile />} />
            ) : (
              <Route path="/yourDetails" element={<ErrorPageTest />} />
            )}

            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Content>
      </Layout>
      <Footer />
    </Layout>
  );
};

export default Dashboard;
