import React from 'react'
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const requests = ({item}) => {
    function AcceptHandler() {
        toast.success("Request Accepted!", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeButton: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
      
        const RejectHandler = async (idToDelete) => {
            try {
                const response = await fetch(`http://localhost:8081/deleteRequest/${idToDelete}`, {
                    mode: "cors",
                    method: "DELETE",
                    headers: {
                      "Content-Type": "application/json",
                    },
                  });
              toast.warn(response.message, {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeButton: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
              });// Replace '/api/delete' with your actual API endpoint
        
              // Handle successful deletion
            //   console.log('Data deleted successfully:', response.data);
            } catch (error) {
              // Handle errors
              console.error('Error deleting data:', error);
            }
          };
        
      
    
  return (
    <div class="slide">
         <ToastContainer />
    <div class="profile">
        <h3 class="name">{item.name}</h3>
        <p class="bio"> {item.message}</p>
        <p class="email">{item.email}</p>
        <p class="phone">{item.phone}</p>
        <p class="preferred-date">{item.date} {item.time}</p>

<button class="btn btn-accept" onClick={AcceptHandler}>Accept</button>
<button class="btn btn-reject" onClick={() => RejectHandler(item.userId)} >Reject</button>
</div>
</div>
  )
}

export default requests
