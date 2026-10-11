const { Router } = require("express");
const expenseRouter = require("./expenseRoutes");
const userRouter = require("./userRoutes");
const OTPRouter = require("./OTP");
const router = Router();

router.use("/user", userRouter);
router.use("/expense", expenseRouter);
router.use('/otp', OTPRouter);

module.exports = router;
