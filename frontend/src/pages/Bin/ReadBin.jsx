import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { Card, Typography, Spin, Button } from 'antd';
import { LeftCircleOutlined, FilePdfOutlined } from '@ant-design/icons';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import jsPDF from "jspdf";
import 'jspdf-autotable';

const { Title, Paragraph } = Typography;

const ReadBin = () => {
    const { id } = useParams();
    const [bin, setBin] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBinData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/bin/getbin/${id}`);
                setBin(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching bin data:', error);
                setLoading(false);
            }
        };

        fetchBinData();
    }, [id]);

    const handleAddBinClick = () => {
        if (bin && bin.binLocation) {
            window.open(bin.binLocation, '_blank');
        }
    };

    const exportPDF = () => {
        const unit = "pt";
        const size = "A4";
        const orientation = "portrait";

        const doc = new jsPDF(orientation, unit, size);

        doc.setFontSize(15);

        const title = "Bin Details";
        const headers = [["Attribute", "Value"]];
        const data = [
            ["ID", bin.binID],
            ["Name", bin.binName],
            ["Location", bin.binLocation],
            ["Open Time", bin.binOpenTime],
            ["Close Time", bin.binCloseTime]
        ];

        doc.text(title, 40, 40);
        doc.autoTable({ startY: 50, head: headers, body: data });
        doc.save("bin_details.pdf");
    };


    if (loading) {
        return <Spin size="large" />;
    }

    if (!bin) {
        return <Typography.Text type="danger">Bin not found</Typography.Text>;
    }

    return (
        <div style={{ justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
            <Card style={{ width: '100%', height: '50%' }}>
                <Link to={"/binall"} style={{ fontSize: '18px', marginRight: '5px' }}>
                    <LeftCircleOutlined style={{ fontSize: '18px' }} /> Back
                </Link>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ flex: 1 }}>
                        <Paragraph style={{ marginBottom: 16 }}>
                            <br/>
                            <strong>Location:</strong>{' '}
                            <br/>
                            <br/>
                            <a href={bin.binLocation} target="_blank" rel="noopener noreferrer">
                                {bin.binLocation}
                            </a>
                        </Paragraph>
                        {/* Google Map Component */}
                        <LoadScript
                            googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY"
                        >
                            <div className="App">
                               <iframe
                                 src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2817.7199278558196!2d80.00812434747924!3d7.083659153817394!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2fd2099b1ce59%3A0x44b07608b4de19aa!2sRamodhi%20food%20center!5e0!3m2!1sen!2slk!4v1713293489106!5m2!1sen!2slk" 
                                 width="600"
                                 height="450"
                                 style={{ border: "0" }}
                                 allowfullscreen=""
                                 loading="lazy"
                                ></iframe>
                             </div>
                        </LoadScript>
                    </div>
                    <div style={{ flex: 1, marginLeft: 125,marginTop: 25 }}>
                        <Title level={4}>Bin Details</Title>
                        <Paragraph>
                            <strong>ID:</strong> {bin.binID}
                        </Paragraph>
                        <Paragraph>
                            <strong>Name:</strong> {bin.binName}
                        </Paragraph>
                        <Paragraph>
                            <strong>Open Time:</strong> {bin.binOpenTime}
                        </Paragraph>
                        <Paragraph>
                            <strong>Close Time:</strong> {bin.binCloseTime}
                        </Paragraph>
                        <div>
                            <Button type="primary" onClick={handleAddBinClick}>Click Directions</Button>
                            <Button type="primary" onClick={exportPDF} style={{ marginLeft: '10px' }} icon={<FilePdfOutlined />}>Export to PDF</Button>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default ReadBin;
