import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Card, Row, Col, Button, Typography } from 'antd';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faArrowLeft } from '@fortawesome/free-solid-svg-icons'; // Import faArrowLeft icon
import { LoadScript } from '@react-google-maps/api';

const BinHomePage = () => {
    const [bins, setBins] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/bin/getall");
                setBins(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleAddBinClick = (binLocation) => {
        if (binLocation) {
            window.location.href = binLocation;
        }
    };

    return (
        <div style={{ marginTop: '20px', padding: '10px' }}>
            <div style={{ maxWidth: '100%', overflow: 'hidden' }}>
                <Carousel showThumbs={false} showStatus={false} autoPlay={true} infiniteLoop={true}>
                    <div>
                        <img src="https://shorturl.at/bpxKN" alt="Image 1" style={{ width: '100%', maxHeight: '500px', objectFit: 'cover' }} />
                    </div>
                    <div>
                        <img src="https://shorturl.at/fLV12" alt="Image 2" style={{ width: '100%', maxHeight: '500px', objectFit: 'cover' }} />
                    </div>
                    <div>
                        <img src="https://shorturl.at/aPSUX" alt="Image 3" style={{ width: '100%', maxHeight: '500px', objectFit: 'cover' }} />
                    </div>
                </Carousel>
            </div>
            <hr style={{ marginBottom: '20px' }} />
            <div style={{ textAlign: 'center' }}>
                <Typography.Title level={2} style={{ margin: '20px 0', color: '#333' }}>All Plasticcycle Bins in Sri Lanka</Typography.Title>
            </div>
            <hr/>
            <div>
                <Typography.Title level={3} style={{ margin: 0, color: 'green' }}>Total Bins: {bins.length}</Typography.Title>
                <Link to={"/CusViewBins"} style={{ fontSize: '25px', marginLeft: '80%' }}>
                    <FontAwesomeIcon style={{ fontSize: '25px' }} /> View all Bins
                </Link>
            </div>

            
            <Row gutter={[16, 16]} justify="center" style={{ marginLeft: '20px', marginRight: '20px' }}>
                {bins.map(bin => (
                    <Col key={bin._id} xs={24} sm={12} md={8} lg={6}>
                        <Card
                         title={<span style={{ color: 'black', textAlign: 'center' }}>{bin.binName}</span>}
                         style={{ margin: '10px', textAlign: 'center' }}
>
                         <p style={{ margin: '10px 0', color: 'blue' }}>Bin Location: {bin.binLocation}</p>
                         <p style={{ margin: '10px 0', color: 'green' }}>Open Time: {bin.binOpenTime}</p>
                         <p style={{ margin: '10px 0', color: 'red' }}>Close Time: {bin.binCloseTime}</p>
    
                    <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
                  <iframe
                     src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2817.7199278558196!2d80.00812434747924!3d7.083659153817394!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2fd2099b1ce59%3A0x44b07608b4de19aa!2sRamodhi%20food%20center!5e0!3m2!1sen!2slk!4v1713293489106!5m2!1sen!2slk`}
                     width="100%"
                     height="200"
                     style={{ border: "0" }}
                     allowfullscreen=""
                     loading="lazy"
                  ></iframe>
                 </LoadScript>
                </Card>
              </Col>
                ))}
            </Row>
        </div>
    );
}

export default BinHomePage;