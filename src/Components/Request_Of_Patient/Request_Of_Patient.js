import React, { useEffect, useState } from "react";
import "./styles.css";
import RequestContainer from "./requests";

const Request_Of_Patient = () => {
  //call api which get all patient request and store it in request
  const [request, setRequest] = useState([]);
  useEffect(() => {
    getRequests();
  }, []);
  const getRequests = async () => {
    const response = await fetch("http://localhost:8081/patientRequest");
    const data = await response.json();
    setRequest(data);
  };

  return (
    <>

      <section class="doctor-profiles">
        <h1 class="heading_drProfile">Patient Requests</h1>
        <div class="slider">
          {request.map((item) => {
            return <RequestContainer item={item} key={item.userId} />;
          })}
        </div>
      </section>
    </>
  );
};

export default Request_Of_Patient;
