import React, { useEffect } from "react";
import Footer from "../Components/Footer";
// import Navbar from "../Components/Navbar";
import Blogs from "../Components/Blogs";
import Reviews from "../Components/Blogs/review";
import GoToTop from "../Components/GoToTop";
import { useNavigate } from "react-router-dom";
const BlogPage = () => {
  const navigate=useNavigate();
  let user;
  useEffect(()=>{
    user=localStorage.getItem("username"); 
    if(!user) navigate("/*");
  },[])
  return (
    <>
      {/* <Navbar /> */}
      
      <GoToTop/>
      <Blogs />
      <Reviews />
      <Footer />
    </>
  );
};

export default BlogPage;
