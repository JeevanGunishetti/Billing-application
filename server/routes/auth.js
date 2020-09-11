const express = require("express");
const router = express.Router();
const {
  signUp,
  signIn,
  activateAccount,
  forgotPassword,
  resetPassword,
  getcompanyName,
} = require("../controllers/auth");

const { userSignupValidator } = require("../validators/auth");
const { runValidation } = require("../validators");

router.post("/signup", userSignupValidator, runValidation, signUp);

router.post("/account-activation", activateAccount);

router.post("/signin", signIn);

router.post("/forgot-password", forgotPassword);

router.post("/reset-password", resetPassword);

// router.get("/company-Name", getcompanyName);

module.exports = router;
