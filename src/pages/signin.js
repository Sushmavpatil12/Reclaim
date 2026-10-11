import React, { useEffect } from "react";
import SignIn from "../Components/Signin";
import Footer from "../Components/Footer";
import { useNavigate } from "react-router-dom";

const SigninPage = () => {
  const navigate = useNavigate();
  let user;
  useEffect(() => {
    user = localStorage.getItem("username");
    if (user) navigate("/");
  }, []);
  return (
    <div>
      <SignIn />
      <Footer />
    </div>
  );
};

export default SigninPage;
