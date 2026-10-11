import React from "react";

const Doctors = ({doctor}) => {
  return (
    <div class="slide">
    <div class="profile">
      <img
        src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.Unwzw3FJ3-gpe-ydfkSJmgHaE8%26pid%3DApi&f=1&ipt=4a6774ed4bdb66d5eca987bf5158b1ceae8ca2d42bed1033190dc8f621369b04&ipo=images"
        alt="Doctor Profile"
      />
      <h3 class="name">Dr. {doctor.name}</h3>
      <p class="qualification">{doctor.qualifications}</p>
      <p class="specialization">{doctor.specialization}</p>
      <p class="bio">
      Passionate neurologist intertwining neurology with mindfulness for stress relief, addiction cessation, advocating holistic well-being.
      </p>
      
      <a href={`#/consultwithdoctor/consultationform?doctorId=${doctor._id}`} class="btn btn-secondary">
        Schedule Consultation
      </a>
    </div>
  </div>
  );
};

export default Doctors;
