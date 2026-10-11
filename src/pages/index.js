import React, { useEffect } from 'react';
import Footer from '../Components/Footer';
import HeroSection from '../Components/Herosection';
import InfoSection from '../Components/InfoSection';
import { homeObjOne } from '../Components/InfoSection/Data';
import Services from '../Components/Services';
import DrServices from '../Components/DrServices';
import Testimonials from '../Components/Testimonials';
import GoToTop from '../Components/GoToTop';


const Home = ({setIsDoctorLoggedIn,isDoctorLoggedIn, isLoggedIn}) => {
   return (
    <>
      <GoToTop />
      <HeroSection setIsDoctorLoggedIn={setIsDoctorLoggedIn} isDoctorLoggedIn={isDoctorLoggedIn} isLoggedIn={isLoggedIn}/>
      {!isDoctorLoggedIn&&<InfoSection {...homeObjOne} />}
      {!isDoctorLoggedIn&&<Services isDoctorLoggedIn={isDoctorLoggedIn}/>}
      {isDoctorLoggedIn&&<DrServices isDoctorLoggedIn={isDoctorLoggedIn}/>}
      {!isDoctorLoggedIn&&<Testimonials />}
      <Footer />
    </>
  )
}

export default Home
