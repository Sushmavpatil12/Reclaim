import React, { useEffect } from 'react'
import SignUp from '../Components/Signup';
import Footer from '../Components/Footer';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const navigate = useNavigate();
  let user;
  useEffect(() => {
    user = localStorage.getItem("username");
    if (user) navigate("/");
  }, []);
  return (
    <div>
      <SignUp />
      <Footer />
    </div>
  );
};

export default SignupPage;
