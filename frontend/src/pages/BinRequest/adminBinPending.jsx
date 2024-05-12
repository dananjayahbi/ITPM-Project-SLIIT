import React, { useState, useEffect } from 'react';
import axios from "axios";
import HeaderComponent from "../../partials/Header";
import BinRequestHeader from "../../partials/binRequestHeader";
import { useNavigate, } from "react-router-dom";
import img from './pending.png'



export default function Item() {
    const [item, setItem] = useState([]);
    const [pendingroom, setPendingRoom] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        function getItem() {
            axios.get("http://localhost:5000/api/binRequest/getall")
                .then((res) => {
                    console.log(res.data)
                    setItem(res.data);
                })
                .catch((err) => {
                    alert(err.message);
                });
        }
        getItem();
    }, []);




    
    const handleApprove = async (id) => {
        try {
            const res = await axios.get(`http://localhost:5000/api/binRequest/get/${id}`);
            const fetchedRoom = res.data;

            const newRoom = {
                binRequestCompany: fetchedRoom.binRequestCompany,
                binRequestAddress: fetchedRoom.binRequestAddress,
                binRequestLocation: fetchedRoom.binRequestLocation,
                binRequestType: fetchedRoom.binRequestType,
                binRequestDate: fetchedRoom.binRequestDate,
                binRequestDescription: fetchedRoom.binRequestDescription,
                hotelId: fetchedRoom.hotelId,
                
            };

            await axios.post(`http://localhost:5000/api/binRequest/acceptedbin/${fetchedRoom.hotelId}`, newRoom);
            await axios.delete(`http://localhost:5000/api/binRequest/delete/${id}`);
            window.location.reload();

            Swal.fire({
                icon: 'success',
                title: 'Room approved and moved to Hotel Room database',
                showConfirmButton: true,
                confirmButtonText: 'OK',
            }).then(() => {
                window.location.reload(); // refresh the page to reflect the changes
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: `Error approving Room: ${error}`,
                showConfirmButton: true,
                confirmButtonText: 'OK',
            });
        }
    };







    const handleReject = async (id) => {
        try {
            const res = await axios.get(`http://localhost:5000/api/binRequest/get/${id}`);
            const fetchedRoom = res.data;

            const newRoom = {
                binRequestCompany: fetchedRoom.binRequestCompany,
                binRequestAddress: fetchedRoom.binRequestAddress,
                binRequestLocation: fetchedRoom.binRequestLocation,
                binRequestType: fetchedRoom.binRequestType,
                binRequestDate: fetchedRoom.binRequestDate,
                binRequestDescription: fetchedRoom.binRequestDescription,
                hotelId: fetchedRoom.hotelId,
                
            };

            await axios.post(`http://localhost:5000/api/binRequest/rejectedbin/${fetchedRoom.hotelId}`, newRoom);
            await axios.delete(`http://localhost:5000/api/binRequest/delete/${id}`);
            window.location.reload();

            Swal.fire({
                icon: 'success',
                title: 'Room approved and moved to Hotel Room database',
                showConfirmButton: true,
                confirmButtonText: 'OK',
            }).then(() => {
                window.location.reload(); // refresh the page to reflect the changes
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: `Error approving Room: ${error}`,
                showConfirmButton: true,
                confirmButtonText: 'OK',
            });
        }
    };


















    return (
        <div>
            <div>
                <BinRequestHeader />
            </div>
    
            <div style={{ margin: '0 auto', maxWidth: '1600px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {item.map((item, index) => (
                    <div key={index} style={{ backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', padding: '20px', marginBottom: '20px', width: 'calc(100% - 50px)', maxWidth: '800px', boxSizing: 'border-box', border: '2px solid #e0e0e0', transition: 'transform 0.3s ease', position: 'relative' ,height:'270px'}}>
                        <div>
                            <h2 style={{ textAlign: '', color: '#333', borderBottom: '1px solid #e0e0e0', paddingBottom: '10px', marginBottom: '10px', border: '1px solid #000000', borderRadius: '10px', padding: '10px', display: 'inline-block',width: '200px' }}><div style={{marginLeft:'24%',color:'blue'}}>PENDING</div></h2>
                            <p style={{marginTop:'-60px', marginLeft:'60%',marginBottom: '20px', color: '#555' }}>Request ID : {item._id}</p>
                            <p style={{ marginLeft:'60%',marginBottom: '20px', color: '#555' }}>Created Date : {item.binRequestDate}</p>
                            <hr></hr>
                            <img src={img} style={{height:'150px'}} alt="Pending" />
                            <div style={{marginLeft:'30%',marginTop:'-17%'}}>
                                <p style={{ marginBottom: '5px', color: '#555',fontSize:'20px',fontWeight:'bold' }}>{item.binRequestCompany}</p>
                                <p style={{ marginBottom: '5px', color: '#555',fontSize:'20px',fontWeight:'bold' }}>Type: {item.binRequestType}</p>
                                <p style={{ marginBottom: '5px', color: '#555',fontSize:'20px',fontWeight:'bold' }}>Location:<a href={item.binRequestLocation}>{item.binRequestAddress}</a></p>
                            </div>
                        </div>
                        <button onClick={() => handleApprove(item._id)} style={{ position: 'absolute', bottom: '40px', right: '150px', backgroundColor: '#4CAF50', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', transition: 'background-color 0.3s ease' }}>Accept</button>
                        <button onClick={() => handleReject(item._id)} style={{ position: 'absolute', bottom: '40px', right: '50px', backgroundColor: 'red', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', transition: 'background-color 0.3s ease' }}>Reject</button>
                    </div>
                ))}
            </div>
        </div>
    );
};
