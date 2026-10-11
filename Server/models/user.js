const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter your name"],
    uppercase: true,
  },
  username: {
    type: String,
    required: [true, "Please Enter your username"]
  },
  email: {
    type: String,
    required: [true, "Email is required field"],
    validate: [isEmail, "Please Enter a valid email"],
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required field"],
    minLength: [8, "Password must be at least 8 characters"],
  },
  phoneNumber: {
    type: String,
    required: [true, "Phone Number is required field"],
    minLength: [10, "Phone Number must be at least 10 characters"],
  },
  feedback: {
    type: String,
    default: "", // Default value set to an empty string
  },
});

userSchema.pre("save", async function (next) {
  if (this.name && this.isModified('name')) {
    // Capitalize the first letter and convert the rest to lowercase
    this.name = this.name.charAt(0).toUpperCase() + this.name.slice(1).toLowerCase();
  }
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("incorrect password");
  }
  throw Error("incorrect email");
};

const User = mongoose.model("user", userSchema);
module.exports = User;
