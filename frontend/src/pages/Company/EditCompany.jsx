import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Form, Input, Button, Row, Col, message, Card, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBGkl9pjHcI3rPuRuEed_gbMtJBZJH2sdc",
  authDomain: "itpm-265a7.firebaseapp.com",
  projectId: "itpm-265a7",
  storageBucket: "itpm-265a7.appspot.com",
  messagingSenderId: "851846459626",
  appId: "1:851846459626:web:0df97d7a3bf380738ae793",
  measurementId: "G-YESNGMN1EB",
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const UpdateCompanyPage = () => {
  const [form] = Form.useForm();
  const { companyId } = useParams();
  const [initialValues, setInitialValues] = useState(null);
  // const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/company/${companyId}`
        );
        const companyData = response.data.buyer;

        if (companyData && Object.keys(companyData).length > 0) {
          setInitialValues({
            companyName: companyData.companyName,
            numberOfCenters: companyData.numberOfCenters,
            companyImage: companyData.companyImage,
            companySlogan: companyData.companySlogan,
            companyAbout: companyData.companyAbout,
            openHours: companyData.openHours,
            closeHours: companyData.closeHours,
            email: companyData.user.email,
          });
        } else {
          console.error("Invalid company data:", companyData);
        }
      } catch (error) {
        console.error("Error fetching company data:", error);
      }
    };
    fetchCompanyData();
  }, [companyId]);

  // const handleImageUpload = async (info) => {
  //   console.log("Image upload triggered", info);
  
  //   if (info.file && info.file.status) {
  //     if (info.file.status === "done") {
  //       try {
  //         const file = info.file.originFileObj;
  //         const storageRef = firebase.storage().ref();
  //         const fileRef = storageRef.child(file.name);
  //         await fileRef.put(file);
  //         const downloadURL = await fileRef.getDownloadURL();
  //         setImageUrl(downloadURL);
  //         setUploadStatus("done");
  //       } catch (error) {
  //         console.error("Error uploading image to Firebase Storage:", error);
  //         setUploadStatus("error");
  //       }
  //     } else if (info.file.status === "uploading") {
  //       setUploadStatus("uploading");
  //     } else if (info.file.status === "error") {
  //       console.log("Image upload status: error");
  //       setUploadStatus("error");
  //     }
  //   }
  // };
  


  const handleSubmit = async (formData) => {
    try {
      const dataToSend = { ...formData };
      // if (imageUrl) {
      //   dataToSend.companyImage = imageUrl;
      // }
      console.log(dataToSend);
      const response = await axios.put(
        `http://localhost:5000/api/company/${companyId}`,
        dataToSend
      );
      console.log(response);
      if (response.data.success) {
        message.success("Company information updated successfully!");
        setTimeout(()=>{
          window.location.href = `/company/${companyId}`;
        },1900)
      } else {
        message.error("Failed to update company information");
      }
    } catch (error) {
      console.error("Error updating company information:", error);
      message.error("Error updating company information");
    }
  };

  const inputStyle = { borderRadius: "40px", height: "40px" };
  const btnStyle = {
    fontSize: "20px",
    width: "150px",
    height: "50px",
    borderRadius: "40px",
    margin: "auto",
    textAlign: "center",
  };

  return (
    <div>
      <Card
        style={{
          width: 1000,
          margin: "30px auto 20px auto",
          boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
          padding: "20px 60px 60px 60px",
        }}
      >
        {initialValues && (
          <>
            <Col span={24}>
              <h2
                style={{
                  marginBottom: 35,
                  textAlign: "center",
                  fontWeight: 400,
                  fontSize: "25px",
                }}
              >
                Edit Company Details
              </h2>
            </Col>
            <Form
              layout="vertical"
              form={form}
              onFinish={handleSubmit}
              initialValues={initialValues}
            >
              <Row gutter={2}>
                <Col span={11} style={{ marginRight: 40 }}>
                  <Form.Item
                    name="companyName"
                    label="Company Name"
                    rules={[
                      { required: true, message: "Please input company name!" },
                    ]}
                  >
                    <Input
                      style={inputStyle}
                      placeholder="Enter Company Name"
                    />
                  </Form.Item>
                </Col>
                {/* <Col span={11}>
                  <Form.Item name="companyImage" label="Company Image">
                    <Upload
                      listType="picture"
                      accept="image/*"
                      maxCount={1}
                      beforeUpload={() => false}
                      onChange={handleImageUpload}
                      onSuccess={(response, file) => {
                        console.log("Image upload successful:", file);
                      }}
                      onError={(error, file) => {
                        console.log("Image upload failed:", file);
                      }}
                    >
                      <Button icon={<UploadOutlined />}>Upload Image</Button>
                    </Upload>
                  </Form.Item>
                </Col> */}
              
              <Col span={11}>
                <Form.Item
                  name="email"
                  label="Company Email"
                  rules={[
                    { required: true, message: "Please input company name!" },
                  ]}
                >
                  <Input style={inputStyle} placeholder="Enter Company Email" />
                </Form.Item>
              </Col>
              </Row>
              <Row>
                
              <Col span={11} style={{ marginRight: 40 }}>
                <Form.Item
                  name="numberOfCenters"
                  label="Number of Centers"
                  rules={[
                    {
                      required: true,
                      message: "Please input number of centers!",
                    },
                  ]}
                >
                  <Input
                    style={inputStyle}
                    placeholder="Enter Number of Centers"
                  />
                </Form.Item>
              </Col>
              <Col span={11}>
                <Form.Item
                  name="companyImage"
                  label="Company Image"
                  rules={[
                    {
                      required: true,
                      message: "Please input Company Image URL!",
                    },
                  ]}
                >
                  <Input
                    style={inputStyle}
                    placeholder="Enter Company Image URL"
                  />
                </Form.Item>
              </Col>
              </Row>
            <Row>
            <Col span={23}>
                  <Form.Item name="companySlogan" label="Company Slogan"
                  rules={[
                    { required: true, message: "Please input Company Slogan!" },
                  ]}>
                    <Input
                      style={inputStyle}
                      placeholder="Enter Company Slogan"
                    />
                  </Form.Item>
                </Col>
            </Row>
              
               
              
              <Row>
                <Col span={23}>
                  <Form.Item name="companyAbout" label="Company About"
                  rules={[
                    { required: true, message: "Please input About Company!" },
                  ]}>
                    <Input.TextArea placeholder="Enter Company About"style={{height:120}} />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={2}>
                <Col span={11} style={{ marginRight: 40 }}>
                  <Form.Item
                    name="openHours"
                    label="Open Hours"
                    rules={[
                      { required: true, message: "Please input Open Hours!" },
                    ]}
                  >
                    <Input
                      style={inputStyle}
                      placeholder="Enter Input Open Hours"
                    />
                  </Form.Item>
                </Col>
                <Col span={11}>
                  <Form.Item name="closeHours" label="Close Hours"
                  rules={[
                    { required: true, message: "Please input Close Hours!" },
                  ]}>
                    <Input style={inputStyle} placeholder="Enter Close Hours" />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col style={{ paddingLeft: 600, paddingTop: 50 }} span={24}>
                  <Form.Item>
                    <Button style={btnStyle} type="primary" htmlType="submit">
                      Update
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </>
        )}
      </Card>
    </div>
  );
};

export default UpdateCompanyPage;
