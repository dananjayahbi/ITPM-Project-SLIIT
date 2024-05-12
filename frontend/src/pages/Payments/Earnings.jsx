import React, { useState, useEffect } from "react";
import { Button, Table, Modal } from "antd";
import { HandCoins } from "lucide-react";
import { DollarOutlined, EyeOutlined } from "@ant-design/icons";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import ViewActionHistoryModal from "./ViewActionHistoryModal";

const Earnings = () => {
  const [user, setUser] = useState({});
  const [activityHistory, setActivityHistory] = useState([]);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  //console.log(user);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    const token = localStorage.getItem("token").replace("Bearer ", "");
    const userID = localStorage.getItem("userId");
    try {
      const response = await axios.get(
        `http://localhost:5000/api/sellar/${userID}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUser(response.data.seller);
      setActivityHistory(response.data.seller.activityHistory);
    } catch (error) {
      console.error("Failed to fetch user data", error);
    }
  };

  // Function to calculate how much the user has earned in the last 30 days
  const calculateEarningsLast30Days = () => {
    const currentDate = new Date();

    // Calculate the date 30 days ago
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    // Filter the activity history by type "earning" and within the last 30 days
    const earningsLast30Days = activityHistory.filter(
      (activity) =>
        activity.type === "earning" &&
        new Date(activity.date) >= thirtyDaysAgo &&
        new Date(activity.date) <= currentDate
    );

    // Calculate the total earnings
    const totalEarnings = earningsLast30Days.reduce(
      (total, earning) => total + earning.amount,
      0
    );

    return totalEarnings;
  };

  // Function to export the report as PDF
  const exportReportToPDF = () => {
    const size = "a4";
    const doc = new jsPDF(size);
    const marginLeft = 40;
    const title = "Activity History Report";
    const headers = [["Date", "Type", "Credits (Cr)"]];
    const data = activityHistory.map((record) => [
      new Date(record.date).toLocaleDateString(),
      record.type,
      record.amount,
    ]);

    doc.text(
      title,
      marginLeft, 
      40
    );

    doc.autoTable({
      head: headers,
      body: data,
      startY: 45,
      theme: "grid",
      margin: { top: 40, right: 40, bottom: 40, left: 40 },
    });
    
    
    doc.save('activity_history_report.pdf');
  };

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date) => {
        const formattedDate = new Date(date).toLocaleDateString();
        return <span>{formattedDate}</span>;
      },
      filters: [
        {
          text: "Last 7 days",
          value: "last7days",
        },
        {
          text: "Last 30 days",
          value: "last30days",
        },
      ],
      onFilter: (value, record) => {
        const currentDate = new Date();
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        switch (value) {
          case "last7days":
            return (
              new Date(record.date) >= sevenDaysAgo &&
              new Date(record.date) <= currentDate
            );
          case "last30days":
            return (
              new Date(record.date) >= thirtyDaysAgo &&
              new Date(record.date) <= currentDate
            );
          default:
            return false;
        }
      },
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      filters: [
        { text: 'Earning', value: 'earning' },
        { text: 'Spend', value: 'spend' },
      ],
      onFilter: (value, record) => record.type === value,
    },
    {
      title: "Credits (Cr)",
      dataIndex: "amount",
      key: "credits",
    },
    {
      title: "Actions",
      key: "actions",
      width: 200,
      render: (record) => (
        <span
          style={{
            display: "flex",
          }}
        >
          <Button
            icon={<EyeOutlined />}
            type="primary"
            onClick={() => handleViewModalOpen(record)}
            style={{ marginRight: "5px", borderRadius: "5px" }}
          >
            View
          </Button>
        </span>
      ),
    },
  ];

  const handleViewModalOpen = (record) => {
    setSelectedRecord(record);
    setViewModalVisible(true);
  };

  const handleViewModalClose = () => {
    setViewModalVisible(false);
  };

  return (
    <>
      <div>
        {/* root div for all page */}
        <div
          style={{
            marginTop: "50px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {/* Page title*/}
          <div>
            <span
              style={{ fontSize: "30px", fontWeight: 600, color: "GrayText" }}
            >
              Earnings
            </span>
          </div>
        </div>
        <div style={{ display: "flex", marginTop: "20px" }}>
          {/* Credit balance cards */}
          <div
            style={{
              width: "50vw",
              marginRight: "5px",
              display: "flex",
              padding: "40px",
              boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
              backgroundColor: "#92f79a",
              borderRadius: "15px",
            }}
          >
            <div style={{ marginRight: "50px" }}>
              <DollarOutlined style={{ fontSize: "70px", color: "#fff" }} />
            </div>
            <div>
              <div>
                <span
                  style={{
                    fontSize: "20px",
                    fontWeight: 400,
                    color: "#fff",
                  }}
                >
                  Credit Balance
                </span>
              </div>
              <div>
                <span
                  style={{
                    fontSize: "30px",
                    fontWeight: 500,
                    color: "#fff",
                  }}
                >
                  {user.creditsBalance + " CR"}
                </span>
              </div>
            </div>
          </div>
          <div
            style={{
              width: "50vw",
              marginLeft: "5px",
              display: "flex",
              padding: "40px",
              boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
              backgroundColor: "#81aaf0",
              borderRadius: "15px",
            }}
          >
            <div style={{ marginRight: "50px" }}>
              <HandCoins size={70} style={{ color: "#fff" }} />
            </div>
            <div>
              <div>
                <span
                  style={{
                    fontSize: "20px",
                    fontWeight: 400,
                    color: "#fff",
                  }}
                >
                  Credits earned in last 30 days
                </span>
              </div>
              <div>
                <span
                  style={{
                    fontSize: "30px",
                    fontWeight: 500,
                    color: "#fff",
                  }}
                >
                  {calculateEarningsLast30Days() + " CR"}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div style={{ marginTop: "50px" }}>
          <div
            style={{
              marginBottom: "10px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span
              style={{ fontSize: "20px", fontWeight: "500", color: "GrayText" }}
            >
              Activity History
            </span>
            <Button
              type="primary"
              style={{
                marginLeft: "10px",
                borderRadius: "5px",
                paddingBottom: "10px",
              }}
              onClick={exportReportToPDF}
            >
              Export Report
            </Button>
          </div>
          <Table
            id="activity-history-table"
            style={{ borderTop: "4px solid #92f79a" }}
            dataSource={activityHistory}
            columns={columns}
          />
          <ViewActionHistoryModal 
            activityRecord={selectedRecord}
            visible={viewModalVisible}
            onView={handleViewModalOpen}
            onCancel={handleViewModalClose}
          />
        </div>
      </div>
    </>
  );
};

export default Earnings;
