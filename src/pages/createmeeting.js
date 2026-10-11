import React from "react";
import Footer from "../Components/Footer";
import GoToTop from "../Components/GoToTop";
import Consult_With_Doctor from "../Components/Creater";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ConsultDoctor = () => {

  return (
    <>
      <GoToTop />
      <Consult_With_Doctor />
      <Footer />
    </>
  );
};

export default ConsultDoctor;
