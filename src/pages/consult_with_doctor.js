import React from "react";
import Footer from "../Components/Footer";
import GoToTop from "../Components/GoToTop";
import Consult_With_Doctor from "../Components/Consult_With_Doctor/Consult_With_Doctor";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ConsultDoctor = () => {
  let user;
  const navigate=useNavigate();
  useEffect(()=>{
    user=localStorage.getItem("username"); 
    if(!user) navigate("/*");
  },[])
  return (
    <>
      <GoToTop />
      <Consult_With_Doctor />
      <Footer />
    </>
  );
};

export default ConsultDoctor;
