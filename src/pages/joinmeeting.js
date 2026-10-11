import React, { useEffect } from "react";
import Footer from "../Components/Footer";
import GoToTop from "../Components/GoToTop";
import Meeting from "../Components/Meeting";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Meets = () => {
  let user,doctor;
  const navigate=useNavigate();
  useEffect(()=>{
    doctor=localStorage.getItem("doctorId");
    user=localStorage.getItem("username"); 
    if(!doctor && !user) navigate("/*");
  },[])

  return (
    <>
      <GoToTop />
      <ToastContainer
      toastClassName={() =>
        "relative flex py-4 px-3 rounded overflow-hidden cursor-pointer bg-white shadow-lg"
      }
      bodyClassName={() => "text-black text-base font-normal"}
      position="bottom-left"
      autoClose={4000}
      hideProgressBar={true}
      newestOnTop={false}
      closeButton={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
      <Meeting />
      <Footer />
    </>
  );
};

export default Meets;
