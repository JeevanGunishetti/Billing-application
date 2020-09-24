const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const _ = require("lodash");
const User = require("../models/auth");
const Logger = require("../utils/logger");
const jwt_decoder = require('jwt-decode');

const AuthLogger = new Logger("users");

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "b995a82c93a99c",
    pass: "74db0dfc8364c9",
  },
});

exports.signUp = (req, res) => {
  const { name, email, password,companyName } = req.body;

  User.findOne({ email }).exec((err, user) => {
    if (err) {
      return res.status(401).json({
        error: "Something went wrong!!",
      });
    }
    if (user) {
      return res.status(400).json({
        error: "Email already exists!!",
      });
    }

    const token = jwt.sign({ name, email, password,companyName}, process.env.JWT_ACCOUNT_ACTIVATION, {
      expiresIn: "10m",
    });
    
    const activateLink = `${process.env.CLIENT_URL}/auth/activate/${token}`;

    const emailData = {
      to: [
        {
          address: email,
          name,
        },
      ],
      from: {
        address: process.env.EMAIL_FROM,
        name: "Billing, System",
      },
      subject: "Account Activation Link",
      html: `
        <div>
          <h1>Please use the following link to activate the account.</h1>

          <a href="${activateLink}" target="_blank">
            ${activateLink}
          </a>

          <hr />

          <p>This email contains sensitive information</p>
          <a href="${process.env.CLIENT_URL}" target="_blank">
            ${process.env.CLIENT_URL}
          </a>
        </div>
      `,
    };

    transport.sendMail(emailData, (err, info) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }

      res.json({
        message: `Email has been successfully sent to ${email}. Follow the instructions i the email to activate your account.`,
      });
    });
  });
};

exports.activateAccount = (req, res) => {
  const { token } = req.body;

  if (token) {
    return jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION, (err) => {
      if (err) {
        return res.status(401).json({
          error: "The link has expired.",
        });
      }

      const { name, email, password,companyName } = jwt.decode(token);

      const newUser = new User({ name, email, password, companyName });

      User.findOne({ email }).exec((err, user) => {
        if (err) {
          return res.status(400).json({
            error: "Something went error.",
          });
        }

        if (user) {
          return res.status(400).json({
            error: "The account has already been activated.",
          });
        }

        newUser.save((err, userData) => {
          if (err) {
            return res.status(400).json({
              error: "Something went error.",
            });
          }

          res.json({
            message: `Hey ${name}, welcome to the app!!`,
          });
        });
      });
    });
  }

  return res.status(401).json({
    error: "The token is invalid",
  });
};

exports.signIn = (req, res) => {
  const { email, password } = req.body;

  AuthLogger.setLogData(req.body);
  AuthLogger.info("Request recieved at auth/signin", req.body);

  User.findOne({ email }).exec((err, user) => {
    if (err || !user) {
      AuthLogger.error("User with the email specified doesn't exist.");

      return res.status(400).json({
        error: "User with the email specified doesn't exist.",
      });
    }

    if (!user.authenticate(password)) {
      return res.status(400).json({
        error: "Password is incorrect",
      });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    const { _id, name, role, email,companyName } = user;

    return res.json({
      token,
      user: {
        _id,
        name,
        role,
        email,
        companyName
      },
      message: "Signed in successfully",
    });
  });
};

exports.forgotPassword = (req, res) => {
  const { email } = req.body;

  User.findOne({ email }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User doesn't exist.",
      });
    }

    const token = jwt.sign({ _id: user._id, name: user.name }, process.env.JWT_RESET_PASSWORD, {
      expiresIn: "10m",
    });

    const link = `${process.env.CLIENT_URL}/auth/password/reset/${token}`;

    const emailData = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: "Password Reset Link",
      html: `
        <h1>Please use the following link to reset your password:</h1>

        <a href="${link}" target="_blank">${link}</a>
      `,
    };

    return user.updateOne({ resetPasswordLink: token }).exec((err, success) => {
      if (err) {
        return res.status(400).json({
          error: "There was an error in saving the reset password link",
        });
      }

      transport
        .sendMail(emailData)
        .then(() => {
          return res.json({
            message: `Email has been successfully sent to ${email}`,
          });
        })
        .catch((err) => {
          return res.status(400).json({
            error: "There was an error in sending the email.",
          });
        });
    });
  });
};

exports.resetPassword = (req, res) => {
  const { resetPasswordLink, newPassword } = req.body;

  if (resetPasswordLink) {
    return jwt.verify(resetPasswordLink, process.env.JWT_RESET_PASSWORD, (err) => {
      if (err) {
        return res.status(400).json({
          error: "Expired link. Try again.",
        });
      }

      User.findOne({ resetPasswordLink }).exec((err, user) => {
        if (err || !user) {
          return res.status(400).json({
            error: "Somethig went wrong. Try later",
          });
        }

        const updateFields = {
          password: newPassword,
          resetPasswordLink: "",
        };

        user = _.extend(user, updateFields);

        user.save((err) => {
          if (err) {
            return res.status(400).json({
              error: "error in resetting the password",
            });
          }

          return res.json({
            message: "Great! The password has reset.",
          });
        });
      });
    });
  }

  return res.status(400).json({
    error: "We have not received the reset password link",
  });
};

exports.getProfileDetails =(req,res) =>{
  const token = req.headers.authorization;
  var decodedUser = jwt_decoder(token);
  console.log(decodedUser);
  const owner_id = decodedUser._id;
  User.findOne({_id:owner_id}).exec((err, user) => {
    if(err || !user){
      return res.status(400).json({
        error: "Something went wrong!!",
      });
    }

    return res.status(200).json({
      user,
      message:"User details fetched successfully.",
    });
  });
};


exports.companyNameupdate = (req,res) =>{
  const token = req.headers.authorization;
  var decodedUser = jwt_decoder(token);
  console.log(decodedUser);
  const owner_id = decodedUser._id;
  const{ companyName} = req.body;

  User.findOneAndUpdate({_id:owner_id},{$set:{companyName}},{ upsert: true, new: true }).exec((err,user)=>{
    if(err){
      return res.status(401).json({
        error: "Something went wrong!!",
      });
    }
    return res.status(200).json({
      user,
      message:"Company Name updated successfully.",
    });
  });
};


exports.userNameupdate = (req,res) =>{

  const token = req.headers.authorization;
  var decodedUser = jwt_decoder(token);
  console.log(decodedUser);
  const owner_id = decodedUser._id;
  const{name} = req.body;

  User.findOneAndUpdate({_id:owner_id},{$set:{name}},{ upsert: true, new: true }).exec((err,user)=>{
    if(err){
      return res.status(401).json({
        error: "Something went wrong!!",
      });
    }
    return res.status(200).json({
      user,
      message:"User Name updated successfully.",
    });
  });
};
