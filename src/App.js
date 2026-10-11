import { lazy, Suspense, useEffect, useState } from "react";
import "./App.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import Loader from "./Components/Loader/Loader";
import HabitTracker from "./pages/HabitTracker";
import Joiner from "./pages/joinmeeting";
const Home = lazy(() => import("./pages"));
const SigninPage = lazy(() => import("./pages/signin"));
const Creater = lazy(() => import("./pages/createmeeting"));
const DevelopPage = lazy(() => import("./pages/develop"));
const Error404 = lazy(() => import("./pages/Error404"));
const BlogPage = lazy(() => import("./pages/blogs"));
const FeedbackPage = lazy(() => import("./pages/feedback"));
const Team = lazy(() => import("./pages/team"));
const SignupPage = lazy(() => import("./pages/signup"));
const DrSignInPage = lazy(() => import("./pages/drsignin"));
const Profile = lazy(() => import("./pages/profile"));
const Navbar = lazy(() => import("./Components/Navbar"));
const ContactPage = lazy(() => import("./pages/contact"));
const GetMail = lazy(() =>
  import("./Components/Forgot_password/ForgotPassword")
);
const Verify = lazy(() =>
  import("./Components/Forgot_password/OTPVerfication")
);
const Blog = lazy(() => import("./Components/BlogPage/Blog"));
const ConsultWithDoctor = lazy(() => import("./pages/consult_with_doctor"));
const RequestOfPatient = lazy(() => import("./pages/request_of_patent"));
const Consultationform = lazy(() =>
  import("./Components/Consult_With_Doctor/ConsultationForm")
);
const Workshops = lazy(() => import("./Components/Workshops/Workshops"));
// import axios from 'axios';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDoctorLoggedIn, setIsDoctorLoggedIn] = useState(false);
  useEffect(() => {
    const checklogin = async () => {
      // const res = await ("/checkLogin",{method: "GET"});
      const token = await localStorage.getItem("authorizationToken");
      const username = await localStorage.getItem("username");
      const drToken = await localStorage.getItem("drToken");
      const doctorId = await localStorage.getItem("doctorId");
      if (token && username) {
        console.log("user");
        if (token) {
          // console.log(token, username);
          setIsLoggedIn(true);
          console.log("user is logged in");
        } else {
          setIsLoggedIn(false);
          console.log("Login kar bhau");
          // window.location.reload();
        }
      } else {
        console.log("doctor");
        if (drToken) {
          setIsDoctorLoggedIn(true);
          console.log(drToken, doctorId);
          // window.location.reload();
        } else {
          console.log("Login kar bhau");
          setIsDoctorLoggedIn(false);

          // window.location.reload();
        }
      }
    };
    checklogin();
  }, []);

  console.log("in app", isLoggedIn, isDoctorLoggedIn);

  return (
    <HashRouter>
      <Suspense fallback={<Loader />}>
        <Navbar
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          isDoctorLoggedIn={isDoctorLoggedIn}
          setIsDoctorLoggedIn={setIsDoctorLoggedIn}
        />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <Home
                isDoctorLoggedIn={isDoctorLoggedIn}
                setIsDoctorLoggedIn={setIsDoctorLoggedIn}
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
              />
            }
          />
          <Route exact path="/signin" element={<SigninPage />} />
          <Route exact path="/develop" element={<DevelopPage />} />
          <Route path="/blogs" element={<BlogPage />} />
          <Route path="/feedback" element={<FeedbackPage />} />
          <Route path="/team" element={<Team />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/consultwithdoctor" element={<ConsultWithDoctor />} />
          <Route path="/requestofpatient" element={<RequestOfPatient />} />
          <Route path="/createmeeting" element={<Creater />} />
          <Route
            exact
            path="/joining"
            element={
              <Joiner
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
                isDoctorLoggedIn={isDoctorLoggedIn}
                setIsDoctorLoggedIn={setIsDoctorLoggedIn}
              />
            }
          />
          <Route
            path="/consultwithdoctor/consultationform/"
            element={<Consultationform />}
          />
          <Route path="/workshops" element={<Workshops />} />
          <Route path="/blogs/:id" element={<Blog />} exact />
          <Route exact path="/signin/forgotPassword" element={<GetMail />} />
          <Route exact path="/signin/otpverification" element={<Verify />} />
          <Route path="/*" element={<Error404 />} />
          <Route exact path="/signup" element={<SignupPage />} />
          <Route exact path="/drsignin" element={<DrSignInPage />} />
          <Route
            exact
            path="/services/HabitTracker"
            element={<HabitTracker />}
          />
          <Route exact path="/profile" element={<Profile />} />
        </Routes>
      </Suspense>
    </HashRouter>
  );
}

export default App;
