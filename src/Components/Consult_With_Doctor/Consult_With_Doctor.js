import React, { useEffect, useState } from 'react';
import Doctors from './Doctors';
import './styles.css';


const Consult_With_Doctor = () => {
  //we have made one get api call http://localhost:8081/allDoctor which gives all doctors in array so take that doctors and map it to Doctors component
  const [doctors, setDoctors] = useState([]);
  useEffect(() => {
    getDoctors();
  }, []);
  const getDoctors = async () => {
    const response = await fetch('http://localhost:8081/allDoctor');
    const data = await response.json();
    setDoctors(data);
  }


  return (
    <>
      <section class="hero">
        <div class="hero-content">
          <h2 class="hero-heading">Consult with Professional Doctors and Therapists</h2>
          <p class="hero-text">Take a step towards a healthier life with personalized consultations and expert guidance.</p>
          <a  class="btn-schedule"> Choose your Doctor Below</a>
        </div>
      </section>


      {/* <!-- Section 2 --> */}

      <section class="doctor-profiles">
        <h1 class="heading_drProfile">Doctor/Therapist Profiles</h1>
        <div class="slider">
          {doctors.map((doctor) => (
            <Doctors doctor={doctor} key={doctor._id} />
          ))}
      
             
          
          
              
          
        </div>
      </section>

      {/* section 3  */}

      <section class="consultation-process">
        <div class="container">
          <h2 class="section-heading">Consultation Process</h2>
          <div class="process-steps">
            <div class="step">
              <span class="step-number">1</span>
              <h3 class="step-heading">Schedule a Consultation</h3>
              <p class="step-description">Choose a convenient time and date for your consultation through our online booking system.</p>
            </div>
            <div class="step">
              <span class="step-number">2</span>
              <h3 class="step-heading">Communication Channels</h3>
              <p class="step-description">We offer various communication channels, including video calls, chat-based communication, and phone calls, to suit your preferences.</p>
            </div>
            <div class="step">
              <span class="step-number">3</span>
              <h3 class="step-heading">Personalized Consultations</h3>
              <p class="step-description">Our professional doctors and therapists provide personalized consultations tailored to your specific needs and goals.</p>
            </div>
            <div class="step">
              <span class="step-number">4</span>
              <h3 class="step-heading">Privacy and Confidentiality</h3>
              <p class="step-description">We prioritize your privacy and confidentiality, ensuring secure and encrypted communication during consultations.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}


export default Consult_With_Doctor;