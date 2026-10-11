import React, { useEffect } from "react";
import DrSignIn from "../Components/DrSignIn";
import Footer from "../Components/Footer";
import { useNavigate } from "react-router-dom";

const DrSignInPage = () => {
  const navigate = useNavigate();
  let doctor;
  useEffect(() => {
    doctor = localStorage.getItem("doctorId");
    if (doctor) navigate("/");
  }, []);
  return (
    <div>
      <DrSignIn />
      <Footer />
    </div>
  );
};

export default DrSignInPage;
