import React, { useState } from "react";
import  Meet  from "./Meeting";
import {
  MeetingContainer,
} from "./MeetingElement";

const App = () => {
  

  return (
    <MeetingContainer>
      <div style={{ height: "20px" }}></div>

      {/* <div className="w-full flex flex-col md:flex-row items-center justify-center"> */}
        {/* <div
          style={{
            maxWidth: "400px",
            width: "100%",
          }}
        >
          
        </div> */}

      
      

      {/* <div style={{ height: "50px" }}></div> */}
      {/* <div style={{ height: "50px" }}></div> */}
      
        
        <Meet />

     
    {/* </div> */}
    <div style={{ height: "20px" }}></div>
    </MeetingContainer >
  );
};

export default App;

