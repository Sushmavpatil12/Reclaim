import React from "react";
import Footer from "../Components/Footer";
import GoToTop from "../Components/GoToTop";
import Request_Of_Patient from "../Components/Request_Of_Patient/Request_Of_Patient";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Requests = () => {
  let doctor;
  const navigate=useNavigate();
  useEffect(()=>{
    doctor=localStorage.getItem("doctorId"); 
    if(!doctor) navigate("/*");
  },[])
  return (
    <>
      <GoToTop />
      <Request_Of_Patient />
      <Footer />
    </>
  );
};

export default Requests;
