const jwt = require("jsonwebtoken");
import {authorize} from "./auth.js"

exports.getUserInfo=(req,res) =>{
    const decoded = jwt.verify(authorization, secret.secretToken);


};
