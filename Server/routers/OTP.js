const { Router } = require("express");
const OTP = require('../controllers/otpsender');

const OTPRouter = Router();


OTPRouter.get('/find', OTP.getOTPByEmail);
OTPRouter.post('/genarate', OTP.getOTP);

module.exports = OTPRouter;