const mongoose = require("mongoose");
const User = require('./user');
const userRequestSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    message: String,
    email: {
      type: String,
      // No need for 'required' as it will be populated from the User model
    },
    phone: String,
    preferredDate: {
      type: String,
      required: true
    },
    preferredTime: {
      type: String,
      required: true
    },
    
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Doctor' // Reference to the Doctor model
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User' // Reference to the User model
    }
  });
  
  // Pre-save hook to populate the email field based on userId
  userRequestSchema.pre('save', async function(next) {
    try {
      const user = await User.findById(this.userId);
      if (user) {
        this.email = user.email; // Set the email from the retrieved user
        this.phone = user.phone; // Set the phone from the retrieved user (optional)
      }
      next();
    } catch (error) {
      next(error);
    }
  });
  
  // Create the UserRequest model
  const UserRequest = mongoose.model('UserRequest', userRequestSchema);
  
  module.exports = UserRequest;