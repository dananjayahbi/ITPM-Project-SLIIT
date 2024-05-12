
import jsPDF from "jspdf";
import React, { useState,useEffect } from 'react';
import axios from 'axios';
import HeaderComponent from "../../partials/Header";
import { Cell,Pie,PieChart,BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';




const ReportPage = () => {


    const currentDate = new Date().toLocaleDateString();
    const[item,setItem] = useState({});




    useEffect(() =>{
        function getItem(){
            axios.get("http://localhost:5000/api/store/getall").then((res) =>{
              
                setItem(res.data);

            }).catch((err) => {
                alert(err.message);
            })
        }
        getItem();
    }, [])

    const calculateTotalAmount = () => {
        let totalAmount = 0;
        if (Array.isArray(item)) {
            item.forEach(item => {
                totalAmount += parseFloat(item.itemAmount);
            });
        } else {
            totalAmount = parseFloat(item.itemAmount);
        }
        return totalAmount;
    };




// Function to handle downloading the store report
const handleDownload = () => {
    // Create a new instance of jsPDF
    const doc = new jsPDF();

    // Define font sizes and colors
    const titleFontSize = 30;
    const contentFontSize = 18;
    const footerFontSize = 10;
    const lineThickness = 0.5;
    const titleColor = "#191970"; // Navy blue
    const textColor = "#000000"; // Black
    const footerColor = "#808080"; // Gray

    // Company information
    const companyName = "Ecolite Company";
    const companyLocation = "Colombo, City";
    const companyCountry = "Sri Lanka, Country";
    const companyWebsite = "www.ecolite.com";

    // Set font size and add current date
    doc.setFontSize(20);
    doc.text(`Date: ${currentDate}`, 20, 30);

    // Add title of the report
    doc.setFontSize(titleFontSize);
    doc.setTextColor(titleColor);
    doc.text("Store Report", 20, 50);

    // Draw a line under the title
    doc.setLineWidth(lineThickness);
    doc.setDrawColor(titleColor); // Match the title color
    doc.line(20, 55, 190, 55);

    // Add content: Total number of items
    doc.setFontSize(contentFontSize);
    doc.setTextColor(textColor);
    doc.text(`Total Number of Items: ${item.length}`, 20, 80);

     // Add content: Total number of items
     doc.setFontSize(contentFontSize);
     doc.setTextColor(textColor);
     doc.text(`Total Amount: ${calculateTotalAmount()}`, 20, 100)


     
    // Add disclaimer
    doc.setFontSize(12);
    doc.setTextColor(textColor);
    doc.text("**This is an auto-generated report. No signature required.", 20, 170);

    // Draw a line above the footer
    doc.setLineWidth(lineThickness);
    doc.setDrawColor(textColor); // Match the text color
    doc.line(20, 155, 190, 155);

    // Add company footer information
    doc.setFontSize(footerFontSize);
    doc.setTextColor(footerColor);
    doc.text(companyName, 20, 185);
    doc.text(companyLocation, 20, 190);
    doc.text(companyCountry, 20, 195);
    doc.setTextColor(titleColor); // Match the title color
    doc.text(companyWebsite, 20, 200);

    // Save the PDF with a specified filename
    doc.save("store_report.pdf");
};



const data = [
    { name: 'Item ',  color: '#0088FE' },
];



    




const prepareData = () => {
    let chartData = [];

    if (Array.isArray(item) && item.length > 0) {
        item.forEach(item => {
            chartData.push({
                itemName: item.itemName,
                itemAmount: parseFloat(item.itemAmount),
              
            });
        });
    }

    return chartData;
};

const renderCustomAxisTick = (tickProps) => {
    const { x, y, payload } = tickProps;
    return <text x={x} y={y} dy={16} textAnchor="end" fill="#666" transform="rotate(-45)">{payload.value}</text>;
};

const COLORS = data.map(entry => entry.color)





  return (
    <div>
        



          


<div style={{ textAlign: 'center', margin: 'auto', width: '50%' }}>
<p style={{ marginBottom: '20px',fontSize:'30px'}}>Company Name: Eco_lite Company</p>
    <p></p>
    <p style={{ fontSize: "25px", fontWeight: "bold" ,marginBottom:'40px'}}>Date: {currentDate}</p>

<div style={{marginTop:'80px',marginLeft:'-300px'}}>
    <p style={{ fontSize: "20px", fontWeight: "bold" ,marginLeft:'-300px' }}>Bar Chart of All Items</p>


    
    <div>

            <ResponsiveContainer width="60%"   height={400}>
                <BarChart
                    data={prepareData()}
                    margin={{ top: 20, right: 30, left: 20, bottom: 50 }} // Added bottom margin for X-axis labels
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="itemName" tick={renderCustomAxisTick} interval={0} /> {/* Ensures all dates are shown */}
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="itemAmount" fill="#8884d8" name="Item Amount" />
                </BarChart>
            </ResponsiveContainer>
            </div>






            </div>








    
        <div style={{marginLeft:'400px' ,marginTop:'-380px'}}>
          

            <div style={{ display: 'flex' }}>
    <p style={{ display: 'inline-block', textAlign: 'center', border: '2px solid #000', padding: '20px', borderRadius: '20px', boxShadow: '2px 2px 5px #888888' , height:'200px', fontSize:'40px' ,width:'300px'}}>Number of Items<br></br> <div style={{textAlign:'center'}}>{item.length} </div></p>
    <p style={{ marginLeft:'20px',display: 'inline-block', textAlign: 'center', border: '2px solid #000', padding: '20px', borderRadius: '20px', boxShadow: '2px 2px 5px #888888' , height:'200px', fontSize:'40px',width:'300px' }}>Total Amount <br></br><div style={{textAlign:'center'}}>{calculateTotalAmount()}</div></p> {/* Display total amount here */}
</div>




<br></br>
<button style={{
    backgroundColor: "green",
    borderRadius: "10px",
    padding: "10px 20px",
    border: "none",
    color: "#fff",
    cursor: "pointer",
    marginLeft:'145px',
    marginTop:'30px'   ,
}} onClick={handleDownload}>
    Download
</button>
</div>





</div>


















    </div>
  )
}

export default ReportPage;
