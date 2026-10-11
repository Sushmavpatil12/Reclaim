import React, { useEffect, useState } from "react";
import { habits } from "./HabitsData";
import styles from "./style.module.css";
import Spinner from "../Loader/Loader"
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function convertStringToArray(inputString) {
  inputString = inputString.trim().toLowerCase();
  let values = inputString.split(",");
  let result = values.map(function (value) {
    return value === "true";
  });
  return result;
}

function countOccurrences(arr, element) {
  return arr.reduce((acc, current) => (current === element ? acc + 1 : acc), 0);
}

async function checkTodayScore(userId) {
  try {
    const response = await fetch(
      `http://localhost:8081/habit-tracker/${userId}/check-today-score`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }

    const data = await response.json();
    return data.isScoreFive; // Assuming the response contains 'isScoreFive' field
  } catch (error) {
    console.error("Error checking today's score:", error);
    return false; // Return false if there's an error
  }
}

async function allTaskDoneOrNot() {
  try {
    const userId = localStorage.getItem("username");
    const taskDone = await checkTodayScore(userId);
    return taskDone;
  } catch (error) {
    console.error("Error:", error);
    return false;
  }
}

async function sendTrackerData() {
  try {
    const userId = localStorage.getItem("username"); // Replace 'your_user_id' with the actual user ID
    const allDone = true;

    const response = await fetch("http://localhost:8081/tracktodaysData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, allDone }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    console.log("Score updated successfully:", data);
    // Handle success, if needed
  } catch (error) {
    console.error("There was a problem updating the score:", error);
    // Handle error
  }
  alert("Your Score has been updated");
}

function Index() {
  const [loading ,setLoading]=useState(false);
  const [activityStatus, setActivityStatus] = useState([]);
  const [allTaskDone, setAllTaskDone] = useState(false);
  const [statusupdate, setStatusUpdate] = useState(false);

  const updateStatus = async () => {
    try {
      setLoading(true);
      const taskDone = await allTaskDoneOrNot(); // Call the function to check task completion
      setStatusUpdate(taskDone); // Update statusupdate state based on the result
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error:", error);
    }
  };
  const sendEmail = async (recipientEmail, weekDetails) => {
    try {
      const response = await fetch('http://localhost:8081/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ recipientEmail, weekDetails }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to send email');
      }
  
      const data = await response.json();
      setLoading(false);
      console.log('Email sent successfully:', data);
      toast.success("Email sent successfully!", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeButton: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      // Handle success or provide feedback to the user
    } catch (error) {
      setLoading(false);
      toast.error("Something went Wrong !", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeButton: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        className: "toast-warn",
      });
 
      console.error('Error sending email:', error.message);
      // Handle errors or provide feedback to the user
    }
  };
  async function sendReport() {
  
    const userId = localStorage.getItem("username");
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:8081/habit-tracker/${userId}/week-details`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      // Handle the response data here
      console.log(data);
      await sendEmail(data.email, data.weekDetails);
      return data; 
      setLoading(false);
      // You can return the data for further processing if needed
    } catch (error) {
      setLoading(false);
      // Handle errors here
      console.error("There was a problem with the fetch operation:", error);
      throw error;
    }
  }
  useEffect(() => {
    if (localStorage.getItem("activity")) {
      let TempArray = convertStringToArray(localStorage.getItem("activity"));
      setActivityStatus(TempArray);
    } else {
      let blankarr = Array(habits.length).fill(false);
      setActivityStatus([...blankarr]);
      localStorage.setItem("activity", blankarr);
    }
    let arr = convertStringToArray(localStorage.getItem("activity"));
    console.log(arr);
    if (arr.every((element) => element === true)) {
      setAllTaskDone(true);
    }
    updateStatus();
    console.log("statusupdated ", statusupdate);
  }, []);

  function handleActivityClick(index) {
    let status = activityStatus;
    // console.log(typeof status);
    try {
      status[index] = !status[index];
      localStorage.setItem("activity", status);
      // console.log(localStorage.getItem("activity"));
      window.location.reload();
    } catch (error) {
      alert(error.message);
    }
  }
  return (
    <div className={`flex px-16 pt-6 flex-col ${styles.container}`}>
      <ToastContainer />
      {loading?(<Spinner/>):(
        <>
      <h1 className="sm:text-xl text-5xl uppercase text-center font-bold w-100 ">
        Your Today's Score - {countOccurrences(activityStatus, true)}/5
      </h1>
      {/* Table */}

      <div
        className={`relative overflow-x-auto shadow-md sm:rounded-lg mt-4  w-9/12 xs:w-full mx-auto ${styles.table}`}
      >
        {!statusupdate ? (
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                {Object.keys(habits[0]).map((elem, index) => {
                  return (
                    <th
                      scope="col"
                      key={index}
                      className={`px-6 py-3 bg-slate-200 text-center ${
                        index === 3 && styles.respo
                      }`}
                    >
                      {elem}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {habits.map((habit, ind) => {
                return (
                  <>
                    <tr
                      key={ind}
                      className={`${
                        ind & 1 ? "bg-slate-200" : "bg-white"
                      } border-b dark:bg-gray-900 dark:border-gray-700 text-center `}
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {habit.name}
                      </th>
                      <td className={`px-6 py-4 ${styles.detail}`}>
                        {habit.detail}
                      </td>

                      <td className={`h-8  ${styles.icon}`}>{habit.icon}</td>
                      <td className=" flex item- w-full items-center justify-center	h-16 ">
                        <buttom
                          data-tooltip-target="tooltip-bottom"
                          data-tooltip-placement="bottom"
                          onClick={() => handleActivityClick(ind)}
                          className={`aspect-square	 h-1/3  ${
                            activityStatus[ind] === true
                              ? "bg-green-300"
                              : "bg-red-500"
                          } rounded-full`}
                        ></buttom>
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div className="mt-10 flex flex-col justify-center items-center">
            <button
              onClick={sendReport}
              className="relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-green-600 transition duration-300 ease-out border-2 border-green-500 rounded-full shadow-md group w-72"
            >
              <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-green-500 group-hover:translate-x-0 ease">
                <svg
                  class="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  ></path>
                </svg>
              </span>
              <span className="absolute flex items-center justify-center w-full h-full text-green-500 transition-all duration-300 transform group-hover:translate-x-full ease">
                Send Tracking Report
              </span>
              <span className="relative invisible">Done</span>
            </button>
          </div>
        )}
      </div>
      {allTaskDone && !statusupdate && (
        <div className="mt-10 flex flex-col justify-center items-center">
          <button
            onClick={sendTrackerData}
            className="relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-green-600 transition duration-300 ease-out border-2 border-green-500 rounded-full shadow-md group w-48"
          >
            <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-green-500 group-hover:translate-x-0 ease">
              <svg
                class="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                ></path>
              </svg>
            </span>
            <span className="absolute flex items-center justify-center w-full h-full text-green-500 transition-all duration-300 transform group-hover:translate-x-full ease">
              Submit Todays Tasks
            </span>
            <span className="relative invisible">Submit</span>
          </button>
        </div>
      )}
      </>)}
    </div>
  );
}

export default Index;
