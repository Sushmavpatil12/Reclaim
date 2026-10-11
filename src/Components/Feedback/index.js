/** @format */

import React from "react";
import Loader from "../Loader/Loader";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Toast.css";

import {
  FormButton,
  FormContent,
  Form,
  FormH1,
  FormInput,
  FormLabel,
  FormWrap,
  Container,
} from "./FeedbackElements";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Feedback = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const username = localStorage.getItem("username");
  const [data, setData] = useState({
    username: username,
    feedback: "",
  });

  const sendPostRequest = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(data);
    if (data.username && data.feedback != "") {
      const response = await fetch("http://localhost:8081/feedback", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status !== 200) {
        setLoading(false);
        toast.warn("Something went Wrong !", {
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
      }
      const result = await response.json();
      console.log(result);
      setLoading(false);

      toast.success("Feedback Sent!", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeButton: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else {
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
    }
  };

  return (
    <>
      <Container>
        <ToastContainer />
        <FormWrap>
          <FormContent>
              <Form onSubmit={sendPostRequest} >
                <FormH1>Share your Feedback</FormH1>
                <FormLabel htmlFor="feedback">Feedback</FormLabel>
                <FormInput
                  aria-label="Share your experience or feedback with us"
                  onChange={(e) =>
                    setData({ ...data, feedback: e.target.value })
                  }
                  placeholder="Share your experience/feedback with us :)"
                  type="text"
                  id="feedback"
                  required
                />
                {loading ? (<Loader />) : (
                <FormButton type="submit">Send</FormButton>)}

              </Form>
            
          </FormContent>
        </FormWrap>
      </Container>
    </>
  );
};

export default Feedback;
