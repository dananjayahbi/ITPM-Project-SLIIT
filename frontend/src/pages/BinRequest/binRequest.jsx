import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import HeaderComponent from "../../partials/Header";
import DatePicker from "react-datepicker";
import img from "./12.jpg";

export default function BinRequest() {
  const navigate = useNavigate();
  const [company, setCompany] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [binRequestCompany, setBinRequestCompany] = useState("");
  const [binRequestAddress, setBinRequestAddress] = useState("");
  const [binRequestLocation, setBinRequestLocation] = useState("");
  const [binRequestType, setBinRequestType] = useState("");
  const [binRequestDate, setBinRequestDate] = useState("");
  const [binRequestDescription, setBinRequestDescription] = useState("");

  useEffect(() => {
    getCompany();
  }, []);

  const getCompany = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/company/all");
      if (response.status === 200) {
        setCompany(response.data.companyAllData);
        console.log("Companies Retrieved successfully", response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  function sendData(e) {
    e.preventDefault();

    const newBinRequest = {
      binRequestCompany,
      binRequestAddress,
      binRequestLocation,
      binRequestType,
      binRequestDate,
      binRequestDescription
    };

    axios
      .post("http://localhost:5000/api/binRequest/create", newBinRequest)
      .then(() => {
        alert("Form Submitted");
        window.location.reload(); // Refresh the page
      })
      .catch((err) => {
        alert(err);
      });
  }

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    // Regular expression for validation
    const urlRegex = /[=@]/;

    if (urlRegex.test(inputValue)) {
      setErrorMessage("");
      setBinRequestLocation(inputValue);
    } else {
      setErrorMessage("Invalid Location URL");
    }
  };

  return (
    <div style={{ backgroundColor: "#f5f5f5" }}>
      <HeaderComponent />

       <h1 style={{marginLeft:'600px',marginTop:'50px'}}>Create a New Request</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >

        
        <div className="content" style={{ display: "flex", width: "100%",marginTop:"-90px",marginLeft:"50px" }}>
          <div style={{ flex: "1", padding: "20px" }}>
            <img src={img} style={{ width: "600px",marginLeft:'50px',borderRadius:20,marginTop:"-20px" }} alt="Bin Image" />
          </div>
          <div style={{ flex: "1", padding: "20px" }}>
            <div className="container1000" style={{ textAlign: "center" }}>
             
              <form
                onSubmit={sendData}
                style={{ display: "flex", flexDirection: "column" ,width:'600px',marginTop:'0px' }}
              >
                <div style={{ display: "flex", marginBottom: "20px" }}>
                  <select
                    required={true}
                    className="form-control"
                    id="binRequestCompany"
                    style={{
                      flex: 1,
                      padding: "10px",
                      borderRadius: "5px",
                      border: "1px solid #ccc",
                    }}
                    onChange={(e) => setBinRequestCompany(e.target.value)}
                  >
                    <option value="" disabled selected>
                      Select a Company
                    </option>
                    {company.map((company) => (
                      <option value={company.companyName}>
                        {company.companyName}
                      </option>
                    ))}
                  </select>
                </div>

                <div style={{ display: "flex", marginBottom: "20px" }}>
                  <input
                    required="true"
                    type="text"
                    className="form-control"
                    id="binRequestAddress"
                    placeholder="Enter address"
                    style={{
                      flex: 1,
                      padding: "10px",
                      borderRadius: "5px",
                      border: "1px solid #ccc",
                    }}
                    onChange={(e) => setBinRequestAddress(e.target.value)}
                  />
                </div>

                <div style={{ display: "flex", marginBottom: "20px" }}>
                  <input
                    required="true"
                    type="text"
                    className="form-control"
                    id="binRequestLocation"
                    placeholder="Enter location URL"
                    style={{
                      flex: 1,
                      padding: "10px",
                      borderRadius: "5px",
                      border: "1px solid #ccc",
                    }}
                    onChange={handleInputChange}
                  />
                </div>

                <p style={{ color: "red", marginTop: "-10px" }}>
                  {errorMessage && <span style={{ color: "red" }}>{errorMessage}</span>}
                </p>

                <div style={{ display: "flex", marginBottom: "20px" }}>
                  <select
                    required="true"
                    className="form-control"
                    id="binRequestType"
                    style={{
                      flex: 1,
                      padding: "10px",
                      borderRadius: "5px",
                      border: "1px solid #ccc",
                    }}
                    onChange={(e) => setBinRequestType(e.target.value)}
                  >
                    <option value="" disabled selected>
                      Select Type
                    </option>
                    <option value="Small">Small</option>
                    <option value="Medium">Medium</option>
                    <option value="Large">Large</option>
                    {/* Add more options as needed */}
                  </select>
                </div>

                <div style={{ display: "flex", marginBottom: "20px" }}>
                  <input
                    type="date"
                    required="true"
                    id="binRequestDate"
                    className="form-control"
                    style={{
                      flex: 1,
                      padding: "10px",
                      borderRadius: "5px",
                      border: "1px solid #ccc",
                    }}
                    onChange={(e) => setBinRequestDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]} // Set min attribute to today's date
                  />
                </div>

                <div style={{ display: "flex", marginBottom: "20px" }}>
                  <textarea
                    required="true"
                    className="form-control"
                    id="binRequestDescription"
                    placeholder="Enter description"
                    style={{
                      flex: 1,
                      padding: "10px",
                      borderRadius: "5px",
                      border: "1px solid #ccc",
                    }}
                    onChange={(e) => setBinRequestDescription(e.target.value)}
                  />
                </div>

                <div style={{ justifyContent: "space-between", marginTop: "20px",marginLeft:'400px' }}>
                  <button
                    type="reset"
                    className="btn-reset"
                    style={{
                      
                      padding: "10px 20px",
                      borderRadius: "5px",
                      border: "1px solid #ccc",
                      background: "red",
                      color: "white",
                      cursor: "pointer",
                      marginRight: "10px",
                      
                    }}
                  >
                    Reset
                  </button>
                  <button
                    type="submit"
                    className="btn-submit"
                    style={{
                     
                      padding: "10px 20px",
                      borderRadius: "5px",
                      border: "none",
                      background: "#4CAF50",
                      color: "white",
                      cursor: "pointer",
                    }}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
