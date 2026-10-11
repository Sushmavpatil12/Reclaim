import React, { useEffect, useState } from "react";
import "./form.css";
import Footer from "../Footer";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation, useNavigate} from "react-router-dom";

const ConsultationForm = () => {
  let user;
  const navigate=useNavigate();
  useEffect(()=>{
    user=localStorage.getItem("username"); 
    if(!user) navigate("/*");
  },[])
 
  const [data, setData] = useState({});
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const doctorId = queryParams.get('doctorId'); 

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    // Get the userID from localStorage
    const userID = localStorage.getItem("username"); // Adjust the key based on your implementation
    setData({ ...data, [name]: value,
      userID: userID, // Add userID to data
      doctorID: doctorId
     });
  };
  // console.log(data);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form inputs
    const {  name, userID, doctorID, message,date,time } =
      data;

    console.log(name, userID, doctorID, message,date,time);
    

    sendPostRequest();
  };
  const sendPostRequest = async (e) => {
    const response = await fetch("http://localhost:8081/sendRequest", {
      mode: "cors",
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },  
    });
    
    const result = await response.json();
    console.log(result);
    if (response.status === 201) {
      toast.success("Request Sent !", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeButton: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
    else{
      toast.error(result.message, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeButton: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      }
    }
  

  return (
    <>
      <section class="appointment-section">
        <ToastContainer/>
        <div class="container">
          <h2 class="section-heading">Make an Appointment</h2>
          <form class="appointment-form" onSubmit={handleSubmit}>
            <div class="form-group">
              <label for="name">Your Name</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                aria-label="Your Name"
                onChange={handleInputChange}
              />
            </div>
            {/* <div class="form-group">
              <label for="email">Email Address</label>
              <input type="email" id="email" name="email" required aria-label="Email Address"/>
            </div>
            <div class="form-group">
              <label for="phone">Phone Number</label>
              <input type="tel" id="phone" name="phone" required aria-label="Phone Number"/>
            </div> */}
            <div class="form-group">
              <label for="date">Preferred Date</label>
              <input
                type="date"
                id="date"
                name="date"
                required
                aria-label="Preferred Date"
                onChange={handleInputChange}
              />
            </div>
            <div class="form-group">
              <label for="time">Preferred Time</label>
              <input
                type="time"
                id="time"
                name="time"
                required
                aria-label="Preferred Time"
                onChange={handleInputChange}
              />
            </div>
            <div class="form-group">
              <label for="message">Message (Optional)</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                aria-label="Message"
                onChange={handleInputChange}
              ></textarea>
            </div>
            <button type="submit" class="btn btn-primary">
              Submit Appointment
            </button>
          </form>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default ConsultationForm;
