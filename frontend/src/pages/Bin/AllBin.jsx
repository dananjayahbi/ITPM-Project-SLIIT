import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Input, Button, Table, Popconfirm } from 'antd';
import { SearchOutlined, EyeOutlined, DeleteOutlined, EditOutlined, DownloadOutlined } from '@ant-design/icons'; // Replace FilePdfOutlined with DownloadOutlined
import { PlusOutlined, HomeOutlined } from '@ant-design/icons'; // Keep the import for PlusOutlined and HomeOutlined
import jsPDF from "jspdf";
import 'jspdf-autotable';

const { Column } = Table;

const AllBinsPage = () => {
    const [bins, setBins] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/bin/getall");
                setBins(response.data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const deleteBin = async (binId) => {
        try {
            await axios.delete(`http://localhost:5000/api/bin/deletebin/${binId}`);
            setBins(prevBins => prevBins.filter(bin => bin._id !== binId));
            window.alert("Bin deleted successfully!");
        } catch (error) {
            console.error(error);
            window.alert("Error deleting bin. Please try again later.");
        }
    };

    const exportPDF = () => {
        const unit = "pt";
        const size = "A4";
        const orientation = "portrait";

        const doc = new jsPDF(orientation, unit, size);

        doc.setFontSize(15);

        const title = "Bin Report";
        const headers = [["No", "Bin ID", "Bin Name", "Bin Location", "Bin Open Time", "Bin Close Time"]];

        const data = bins.map((bin, index) => [
            index + 1,
            bin.binID,
            bin.binName,
            bin.binLocation,
            bin.binOpenTime,
            bin.binCloseTime
        ]);

        doc.text(title, 40, 40);
        doc.autoTable({ startY: 50, head: headers, body: data });
        doc.save("report.pdf");
    };

    const filteredBins = bins.filter(bin => {
        return bin.binName.toLowerCase().includes(searchQuery.toLowerCase());
    });

    return (
        <div>
            {error && <div>Error: {error.message}</div>} 
            {loading ? (
                <div>Loading...</div> 
            ) : (
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                        <div>
                            <Input
                                type="text"
                                placeholder="Search by bin name"
                                value={searchQuery}
                                onChange={handleSearchInputChange}
                                style={{ width: '150px', marginRight: '10px' }}
                                prefix={<SearchOutlined />}
                            />
                        </div>
                        <div>
                            <Button className='btn-pay' onClick={exportPDF} icon={<DownloadOutlined />}>Generate PDF</Button>
                        </div>
                        <div>
                            <Link to="/createbin">
                                <Button style={{ marginLeft: '15px'}} type="primary" icon={<PlusOutlined />}>Add Bin</Button>
                            </Link>
                        </div>
                        <div>
                            <Link to="/Binhome">
                                <Button style={{ marginLeft: '15px'}} type="primary" icon={<HomeOutlined />}>Bin Home Page</Button>
                            </Link>
                        </div>
                        <div style={{ marginLeft: 'auto' }}>
                            <span style={{ marginRight: '40px', fontSize: '27px' }}>Total Bins: {bins.length}</span>
                            <span style={{ marginRight: '40px', fontSize: '27px' }}>Open Bins: {bins.filter(bin => bin.status === 'open').length}</span>
                        </div>
                    </div>
                    <Table
                        dataSource={filteredBins}
                        pagination={false}
                        rowKey='_id'
                        id="binTable"
                    >
                        <Column title="NO" dataIndex="index" key="index" render={(text, record, index) => index + 1} />
                        <Column title="Bin ID" dataIndex="binID" key="binID" />
                        <Column title="Bin Name" dataIndex="binName" key="binName" />
                        <Column title="Bin Location" dataIndex="binLocation" key="binLocation" render={(text, record) => (
                            <a href={`https://www.google.com/maps/place/${record.binLocation}`} target="_blank" rel="noopener noreferrer">View Location</a>
                        )} />
                        <Column title="Bin Open Time" dataIndex="binOpenTime" key="binOpenTime" />
                        <Column title="Bin Close Time" dataIndex="binCloseTime" key="binCloseTime" />

                        <Column
                            title="Action"
                            key="action"
                            render={(text, record) => (
                                <span className='actionButton'>
                                    <Link to={`/getbin/${record._id}`}><Button icon={<EyeOutlined />} className='ViewButton' /></Link>
                                    <Popconfirm
                                        title="Are you sure delete this bin?"
                                        onConfirm={() => deleteBin(record._id)}
                                        okText="Yes"
                                        cancelText="No"
                                    >
                                        <Button type="danger" icon={<DeleteOutlined />} className='DeleteButton' />
                                    </Popconfirm>
                                    <Link to={`/updatebin/${record._id}`}><Button icon={<EditOutlined />} /></Link>
                                    <Link onClick={exportPDF}><Button icon={<i class="fa-solid fa-cloud-arrow-down"></i>} /></Link>
                                </span>
                            )}
                        />
                    </Table>
                </div>
            )}
        </div>
    );
}

export default AllBinsPage;
