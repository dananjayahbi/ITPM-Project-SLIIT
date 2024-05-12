import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import {
  Input,
  Button,
  Layout,
  Card,
  message,
  Rate,
  Spin,
  Divider,
} from "antd";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { SendOutlined } from "@ant-design/icons";
import PerfectScrollbar from "@opuscapita/react-perfect-scrollbar";

const { Meta } = Card;

const CustomerServiceModal = () => {
  const [conversation, setConversation] = useState([]);

  const initialValues = {
    message: "",
  };

  const onSubmit = async (values, { resetForm }) => {
    resetForm();
    const { message } = values;

    setConversation((prevConversation) => [
      ...prevConversation,
      { type: "user", content: message },
    ]);

    try {
      const response = await axios.post("http://localhost:5000/api/ai/chat", {
        message,
      });

      setConversation((prevConversation) => [
        ...prevConversation,
        { type: "ai", content: response.data.bot },
      ]);
    } catch (error) {
      console.error("Error fetching AI response", error);
      message.error("Error fetching AI response");
    }

    
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "500px",
        position: "relative",
      }}
    >
      <div style={{ flex: 1, overflowY: "auto", marginBottom: "10px" }}>
        <PerfectScrollbar>
        {conversation.map((message, index) => (
          <div key={index} style={{ marginBottom: "10px" }}>
            {message.type === "user" ? (
              <div style={{ display: "flex", justifyContent: "right" }}>
                <div
                  style={{
                    display: "flex",
                    marginBottom: "5px",
                    backgroundColor: "#f6ffed",
                    padding: "5px 20px",
                    border: "1px solid #e4f7d5",
                    borderRadius: "15px",
                    color: "#389e0c",
                  }}
                >
                  <div style={{ textAlign: "left" }}>{message.content}</div>
                </div>
              </div>
            ) : (
              <div style={{display: "flex", justifyContent: "left",}}>
                <div
                  style={{
                    display: "flex",
                    marginBottom: "5px",
                    backgroundColor: "#fcffe6",
                    padding: "5px 10px",
                    border: "1px solid #eafe8f",
                    borderRadius: "15px",
                    color: "#9fc843",
                  }}
                >
                  <div style={{ textAlign: "left" }}>{message.content}</div>
                </div>
              </div>
            )}
          </div>
        ))}
        </PerfectScrollbar>
      </div>
      <Divider />
      <div style={{ position: "absolute", bottom: 0, width: "100%" }}>
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          <Form style={{ display: "flex", alignItems: "center", padding: "0 10px" }}>
            <Field name="message" style={{ flex: 1, marginRight: "5px" }}>
              {({ field, meta }) => (
                <Input
                  {...field}
                  placeholder="Enter the message here..."
                  style={{ width: "100%" }}
                />
              )}
            </Field>
            <Button
              type="primary"
              htmlType="submit"
              style={{ paddingBottom: "15px", marginLeft: "5px"}}
            >
              Send
              <SendOutlined />
            </Button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default CustomerServiceModal;
