//imported express
const express = require("./node_modules/express");
const cookieParser = require("cookie-parser");
const mongoose = require("./node_modules/mongoose");
const HabitTracker = require("./models/habitTracks");
const updateDaySchemaForAllUsers = require("./dailyUpdater");
const User = require("./models/user");
const Request = require("./models/userRequests");
const Doctor = require("./models/doctor");
const app = express();
const jwt = require("./node_modules/jsonwebtoken");
const cors = require("cors");

const maxAge = 3 * 24 * 60 * 60;

//imported npm package "cors"
app.use(cors());
app.use(express.json());
app.use(cookieParser());

//imported nodemailer for using SMTP server
const nodemailer = require("nodemailer");

//this is the port number
const port = 8081;

//this will help to read json objects in requests as javascript objects.
app.use(express.json());
const path = require("path");
const { log } = require("util");

//required "bcrypt" npm package for password incryption.

//required jsonwebtokens npm package for authorization.

//this is secrete key used to generate tokens
const jwtSecretKey = "!@#$%^&*";
const dbPath = path.join(__dirname, "/User_Database.db");
let db = null;

const day = new Date().toISOString().split("T")[0];
console.log(day);

async function databaseSetup() {
  try {
    await mongoose.connect(
      "mongodb+srv://kalyanimali:kalyani123@rcpit.rl2wksx.mongodb.net/Reclaim"
    );

    const db = mongoose.connection;
    console.log("Database connected:", db.name);

    db.on("connected", () => {
      console.log("Mongoose default connection open to " + db.name);
    });

    db.on("disconnected", () => {
      console.log("Mongoose default connection disconnected");
    });

    db.on("error", (err) => {
      console.error("Mongoose default connection error:", err);
    });
  } catch (error) {
    console.error("Connection error:", error.message);
    process.exit(1);
  }
}

async function runScheduledTask() {
  const schedule = require("node-schedule");
  try {
    const runAtMidnight = "53 14  * * *"; // cron expression for midnight

    // Schedule the function to run at midnight
    schedule.scheduleJob(runAtMidnight, updateDaySchemaForAllUsers);

    console.log("DaySchema updated for all users.");
  } catch (error) {
    console.error("Error updating DaySchema:", error);
  }

  console.log("Scheduled job finished.");
}

//database setup
databaseSetup();

//daily routine
runScheduledTask();

app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "script-src 'self' 'wasm-unsafe-eval' 'inline-speculation-rules' https://apis.google.com;"
  );
  next();
});
app.listen(port, () => {
  console.log(`server started on port ${port}`);
});

const handleError = (err) => {
  let errors = { email: "", password: "" };

  // incorrect email
  if (err.message === "incorrect email") {
    errors.email = "That email is not registered";
  }

  // incorrect password
  if (err.message === "incorrect password") {
    errors.password = "That password is incorrect";
  }

  // duplicate error code
  if (err.code === 11000) {
    errors.email = "That email is already registered";
    return errors;
  }

  if (err.message.includes("user validation failed")) {
    let errorsarray = Object.values(err.errors);
    errorsarray.forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

app.get("/allDoctor", async (req, res) => {
  //we have mongodb collection named "doctors" find all doctor from it in array of object fromat if no doctor present or error give no doctor or error

  const doctors = await Doctor.find({});
  res.json(doctors);
});

app.get("/patientRequest", async (req, res) => {
  //we have mongodb collection named "doctors" find all doctor from it in array of object fromat if no doctor present or error give no doctor or error

  const requests = await Request.find({});
  res.json(requests);
});

app.post("/SignUp", async (req, res) => {
  const { email, username, name, contactNumber, password, confirmpassword } =
    req.body;
  console.log(req.body);
  const userExists = await User.findOne({
    $or: [
      { email: email },
      { username: username },
      { phoneNumber: contactNumber },
    ],
  });
  console.log(userExists);
  if (userExists) {
    res.status(400).json({ errors: { message: "User already exists" } });
  } else if (password == confirmpassword) {
    try {
      const user = await User.create({
        name,
        email,
        password,
        username,
        phoneNumber: contactNumber,
      });

      // Create a new habit tracker entry for the user
      try {
        const habitTrackerEntry = await HabitTracker.create({
          userId: user._id, // Using the ID of the newly created user
          weeks: [{ days: [] }], // Initialize with an empty week for the user
        });

        console.log(
          "HabitTracker entry created for the new user:",
          habitTrackerEntry
        );
      } catch (error) {
        console.error("Error creating HabitTracker entry:", error);
      }

      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        ETag: "12345",
      });
      res.status(201).json({ user });
      console.log("user register ho gaya bhai");
    } catch (err) {
      const errors = handleError(err);
      res.status(404).json({ errors });
    }
  } else {
    res
      .status(400)
      .json({ errors: { confirmpassword: "Password Doesn't matches" } });
  }
});

app.post("/DrSignUp", async (req, res) => {
  const {
    email,
    username,
    name,
    contactNumber,
    password,
    confirmpassword,
    specialization,
    qualifications,
  } = req.body;
  console.log(req.body);

  const doctorExists = await Doctor.findOne({
    $or: [
      { email: email },
      { username: username },
      { phoneNumber: contactNumber },
    ],
  });
  console.log(doctorExists);
  if (doctorExists) {
    res.status(400).json({ errors: { message: "Doctor already exists" } });
  } else if (password == confirmpassword) {
    try {
      const doctor = await Doctor.create({
        name,
        email,
        password,
        username,
        phoneNumber: contactNumber,
        specialization,
        qualifications,
      });
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        ETag: "12345",
      });
      res.status(201).json({ doctor });
      console.log("Doctor register ho gaya bhai");
    } catch (err) {
      console.log(err);
      console.log("i am in catch");
      const errors = handleError(err);
      res.status(404).json({ errors });
    }
  } else {
    res
      .status(400)
      .json({ errors: { confirmpassword: "Password Doesn't matches" } });
  }
});

app.post("/sendRequest", async (req, res) => {
  console.log("sendRequest is called");
  const { name, message, time, date, userID, doctorID } = req.body;
  console.log(req.body);

  const requestExists = await Request.findOne({
    userId: userID,
  });
  console.log(requestExists);

  if (requestExists) {
    res.status(400).json({ message: "Request already sent" });
  }

  const requester = await User.findOne({
    _id: userID,
  });
  console.log(requester);

  if (requester) {
    const userogID = requester._id;
    try {
      const requestdetail = await Request.create({
        name,
        message,
        preferredDate: date,
        preferredTime: time,
        doctorId: doctorID,
        userId: userogID,
      });
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        ETag: "12345",
      });
      res.status(201).json({ requestdetail });
      console.log("request registered");
    } catch (err) {
      console.log(err);
      console.log("i am in catch");
      const errors = handleError(err);
      res.status(404).json({ message: errors });
    }
  } else {
    console.log("what");
    res.status(400).json({ message: "user not found" });
  }
});

app.post("/SignIn", async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);

  try {
    const user = await User.login(email, password);
    console.log(user);
    const payLoad = {
      userId: user._id,
    };
    const jwtToken = await jwt.sign(payLoad, "jwtSecretKey");
    console.log(user._id);
    console.log(jwtToken);
    res.cookie("jwtToken", jwtToken, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ user, jwtToken });
  } catch (err) {
    console.log(err.message);
    const errors = handleError(err);
    res.status(404).json({ errors });
  }
});

app.post("/DrSignIn", async (req, res) => {
  console.log("DrSignIn is called");
  const { email, password } = req.body;
  console.log(req.body);
  // const bringUserWithEmailQuery = `
  // select * from user_details where
  //  email like '${email}';`;
  // const dbUser = await db.get(bringUserWithEmailQuery);
  // if (dbUser === undefined) {
  //     res.set({
  //         'Content-Type': 'application/json',
  //         'Access-Control-Allow-Origin': '*',
  //         'ETag': '12345'
  //     })
  //     res.status(400);
  //     res.send("this user is not present");
  // } else {
  //     console.log(password);
  //     // dbUser.password = dbUser.password.toString();
  //     console.log(dbUser.password);
  //     const isPasswordMatched = await bcrypt.compare(password, dbUser.password);
  //     console.log(isPasswordMatched);
  //     if (isPasswordMatched) {
  //         const payLoad = {
  //             username: dbUser.username
  //         };
  //         const jwtToken = await jwt.sign(payLoad, jwtSecretKey);
  //         console.log(jwtToken);
  //         res.set({
  //             'Content-Type': 'application/json',
  //             'Access-Control-Allow-Origin': '*',
  //             'ETag': '12345'
  //         })
  //         // req.cookie("jwtToken", jwtToken, { httpOnly: true,});
  //         res.status(200).json({ jwtToken:jwtToken,username:dbUser.username });
  //     } else {
  //         res.status(400);
  //         res.set({
  //             'Content-Type': 'application/json',
  //             'Access-Control-Allow-Origin': '*',
  //             'ETag': '12345'
  //         })
  //         res.send("invalid password");
  //     }
  // }
  try {
    const doctor = await Doctor.login(email, password);
    console.log(doctor);
    const payLoad = {
      doctorId: doctor._id,
    };
    const jwtToken = await jwt.sign(payLoad, "jwtSecretKey");
    console.log(doctor._id);
    console.log(jwtToken);
    res.cookie("jwtToken", jwtToken, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ doctor, jwtToken });
  } catch (err) {
    console.log(err.message);
    const errors = handleError(err);
    res.status(404).json({ errors });
  }
});

app.get("/checkLogin", async (req, res) => {
  console.log("request Accepted");
  // let token = localStorage.getItem("authorizationToken");
  let token = req.cookies.jwtToken;
  if (token) {
    jwt.verify(token, jwtSecretKey, async (err, decodedToken) => {
      if (err) {
        res.status(200).json({ msg: "Login to Proceed" });
      } else {
        const user = await User.findById(decodedToken.id);
        if (user) {
          res.status(200).json({ msg: "User Login Found" });
          console.log(msg);
        }
      }
    });
  } else {
    res.status(200).json({ msg: "Login to Proceed" });
  }
  //this need to be defined
});

app.post("/tracktodaysData", async (req, res) => {
  const { userId, allDone } = req.body;

  try {
    if (!userId || typeof allDone === "undefined") {
      return res
        .status(400)
        .json({ error: "userId and allDone fields are required." });
    }

    // Find or create the user's habit tracker data
    let userHabitTracker = await HabitTracker.findOne({ userId });

    if (!userHabitTracker) {
      return res.status(404).json({ message: "User not found." });
    }

    // Ensure the current week has a day for today
    const currentWeek =
      userHabitTracker.weeks[userHabitTracker.weeks.length - 1];

    // Check if today's date exists in the days array
    const currentDate = new Date().toISOString().split("T")[0];
    const dayExists = currentWeek.days.some((day) => day.date === currentDate);

    // If current day is not found, create a new day for today
    if (!dayExists) {
      const newDay = { date: currentDate, score: 0 }; // Initialize with today's date and default score
      currentWeek.days.push(newDay);
    }

    // Update score to 5 if allDone is true for the current day
    if (allDone) {
      // Get the current day and update score if it exists
      const currentDay = currentWeek.days.find(
        (day) => day.date === currentDate
      );
      if (currentDay) {
        currentDay.score = 5;
      }
    }

    // Save changes to the database
    await userHabitTracker.save();

    return res.status(200).json({ message: "Score updated successfully." });
  } catch (error) {
    console.error("Error updating score:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
});

//geting id
async function getEmailById(userId) {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    return user.email;
  } catch (error) {
    console.error("Error retrieving email:", error);
    throw error;
  }
}
app.get("/habit-tracker/:userId/week-details", async (req, res) => {
  console.log("sending data");
  const { userId } = req.params;

  try {
    // Find the HabitTracker entry for the provided userId
    const habitTracker = await HabitTracker.findOne({ userId });

    if (!habitTracker) {
      return res
        .status(404)
        .json({ error: "HabitTracker not found for this user." });
    }

    // Get the week array from the habitTracker entry
    const weekArray = habitTracker.weeks;

    // Extract each day with its score for the week
    const weekDetails = weekArray.flatMap((week) =>
      week.days.map((day) => ({ date: day.date, score: day.score }))
    );

    const email = await getEmailById(userId);
    res.status(200).json({ email, weekDetails });
  } catch (error) {
    console.error("Error fetching week details:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

app.post("/send-email", async (req, res) => {
  const { recipientEmail, weekDetails } = req.body;
  console.log("printing data:", req.body);
  
  // Use the correct SMTP server address and port
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    auth: {
      user: "rcpitcom2@gmail.com",
      pass: "sxmc bmvj rcxs olqu",
    },
    secure: true, // Enable TLS for secure connection
  });
  
  // Compose the email
  const mailOptions = {
    from: "rcpitcom2@gmail.com",
    to: "yashodipbeldar@gmail.com",
    subject: "Week Details",
    html: `
      <h2>Week Details</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Date</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          ${weekDetails
            .map(
              (detail) => `
                <tr>
                  <td>${detail.date}</td>
                  <td>${detail.score}</td>
                </tr>
              `
            )
            .join("")}
        </tbody>
      </table>
    `,
  };
  
  // Send the email
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
  
});

app.get("/habit-tracker/:userId/check-today-score", async (req, res) => {
  const { userId } = req.params;

  try {
    // Find the HabitTracker entry for the provided userId
    const habitTracker = await HabitTracker.findOne({ userId });

    if (!habitTracker) {
      return res
        .status(404)
        .json({ error: "HabitTracker not found for this user." });
    }

    // Get today's date without time for comparison
    const today = new Date().toISOString().split("T")[0];

    // Check if today's date is present in the habitTracker's days array
    const todayEntry = habitTracker.weeks
      .flatMap((week) => week.days)
      .find((day) => day.date === today);

    if (!todayEntry) {
      return res.status(200).json({ present: false });
    }

    // Check if today's score is 5
    const isScoreFive = todayEntry.score === 5;

    res.status(200).json({ present: true, isScoreFive });
  } catch (error) {
    console.error("Error checking today's score:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

app.post("/feedback", async (req, res) => {
  try {
    const { username, feedback } = req.body;

    const existingUser = await User.findOne({ username: username });

    if (existingUser) {
      await User.updateOne(
        { username: username },
        { $set: { feedback: feedback } }
      );
      console.log("Feedback updated for user:", { username, feedback });
      res.status(200).json({ message: "Feedback submitted successfully" });
    } else {
      res.status(400).json({
        message: "User is not registered. Please register to submit feedback",
      });
    }
  } catch (error) {
    console.error("Error submitting feedback:", error);
    res.status(500).json({ message: "Failed to submit feedback" });
  }
});

app.get("/feedback", async (req, res) => {
  const getAllDataQuery = `SELECT * FROM user_details`;
  const updatedData = await db.all(getAllDataQuery);
  res.json(updatedData);
});

app.get("/", async (req, res) => {
  res.send("HEllo world");
});

// SMTP server for Contact Form
// app.post("/mail", (req, res) => {
//   // console.log(req.body)
//   var transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: "your-email@gmail.com",
//       pass: "generated-password",
//       // https://myaccount.google.com/u/1/apppasswords
//     },
//   });

//   var options = {
//     from: "your-email@gmail.com",
//     to: "your-email@gmail.com",
//     subject: "Contact Request",
//     html: `
//         <div style="padding:10px; border-style: ridge">
//         <h3>You have a new contact request.</h3>
//         <h4>Contact Details</h4>
//         <ul>
//             <li>Name: ${req.body.name}</li>
//             <li>Email: ${req.body.mail}</li>
//             <li>Subject: Contact Request </li>
//             <li>Message: ${req.body.message}</li>
//         </ul>
//         </div>
//         `,
//   };

//   transporter.sendMail(options, function (error, info) {
//     if (error) {
//       console.log(error);
//       res.json("Couldnot send Email");
// } else {
//       console.log("Email Sent Successfully");
//       res.json("Email Sent Successfully");
//     }
//   });
// });
