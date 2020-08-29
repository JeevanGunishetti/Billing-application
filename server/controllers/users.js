const User = require("../models/auth");
const jwt = require("jsonwebtoken");

exports.listUsers = (__, res) => {
  User.find({}, { hashed_password: 0, salt: 0, resetPasswordLink: 0 }).exec((err, users) => {
    if (err) {
      return res.status(400).json({
        error: "Something went wrong. Please try again.",
      });
    }
    // const jwt = localStorage.getItem(token);
    // const _id = jwt.decode(jwt);
    // console.log(_id);
    return res.json({
      result: users,
    });
  });
};
