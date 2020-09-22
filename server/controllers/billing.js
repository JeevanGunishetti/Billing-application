const Bill = require("../models/billing");
const jwt = require("jsonwebtoken");
const jwt_decoder = require('jwt-decode');
const moment = require("moment");

exports.billing =(req, res)=>{
    const {customer_name, customer_phone, customer_address, customer_father, nominee_name,
    nominee_address, nominee_phone, total_amount, rateofinterest, expected_time, discount,totalamountafterdiscount,status} = req.body;

    const token = req.headers.authorization;
    var decodedUser = jwt_decoder(token);
    console.log(decodedUser);
    const owner_id = decodedUser._id;
    // console.log(owner_id);
    // console.log(owner);
    // const status = "due";

    const newBill = new Bill({owner_id,customer_name, customer_phone, customer_address, customer_father, nominee_name,
    nominee_address, nominee_phone, total_amount, status, rateofinterest, expected_time,status,discount,totalamountafterdiscount});

    newBill.save((err, billData)=>{
      if(err){
        console.log(err);
        return res.status(400).json({
          error:"something went wrong! Please try again.",
        });
      }
      res.status(200).json({
        message:"Bill data successfully saved.",
      });
    });
};


exports.advanceorders =(req, res)=>{
  const token = req.headers.authorization;
  var decodedUser = jwt_decoder(token);
  console.log(decodedUser);
  const owner = decodedUser._id;

  Bill.find({owner_id:owner, status:"advance"},{owner_id:0}).exec((err,bills) =>{
    if(err){
      return res.status(400).json({
        error:"something went wrong.",
      });
    }
    if(!bills)
    {
      return res.status(401).json({
        error:"No advance orders are found.",
      });
    }
    return res.status(200).json({
      bills,
      message:"advance order bills are fetched.",
    });
  });
};


exports.newcredit =(req, res)=>{
  const {customer_name, customer_phone, customer_address, customer_father, nominee_name,
  nominee_address, nominee_phone, total_amount, rateofinterest, expected_time} = req.body;

  const token = req.headers.authorization;
  var decodedUser = jwt_decoder(token);
  const owner_id = decodedUser._id;
  const status = "due";
  const products = null;

  const newBill = new Bill({owner_id,customer_name, customer_phone, customer_address, customer_father, nominee_name,
  nominee_address, nominee_phone, total_amount, rateofinterest, expected_time, status, products});

  newBill.save((err, billData) => {
    if(err) {
      console.log(err);
      return res.status(400).json({
        error:"something went wrong! Please try again.",
      });
    }
    res.status(200).json({
      message:"Bill data successfully saved.",
    });
  });
};

exports.duecredits =(req, res)=>{

  const token = req.headers.authorization;
  var decodedUser = jwt_decoder(token);
  console.log(decodedUser);
  const owner = decodedUser._id;

  Bill.find({owner_id:owner, status:"due", products:null},{owner_id:0}).exec((err,bills) =>{

    if(err){
      console.log(err);
      return res.status(400).json({
        error:"something went wrong.",
      });
    }
    if(!bills)
    {
      return res.status(401).json({
        error:"No Due credits are found.",
      });
    }
    return res.status(200).json({
      bills,
      message:"bills are got",
    });
  });

};

exports.duecreditwithitems =(req, res)=>{

  const token = req.headers.authorization;
  var decodedUser = jwt_decoder(token);
  console.log(decodedUser);
  const owner = decodedUser._id;

  Bill.find({owner_id:owner, status:"due", products:{$ne:null}},{owner_id:0}).exec((err,bills) =>{
    if(err){
      return res.status(400).json({
        error:"something went wrong.",
      });
    }
    if(!bills)
    {
      return res.status(401).json({
        error:"No Due credits with items are found.",
      });
    }
    return res.status(200).json({
      bills,
      message:"Due credit with items are fetched."
    });
  });
};


exports.pastcredits =(req, res)=>{

  const token = req.headers.authorization;
  var decodedUser = jwt_decoder(token);
  // console.log(decodedUser);
  const owner = decodedUser._id;
  // _id:1,customer_name:1, total_amount:1,
     // customer_address:1, customer_phone:1,nominee_name:1,expected_time:1,nominee_address:1,nominee_phone:1

  Bill.find({owner_id:owner, status:"due", products:{$exists:true}},{owner_id:0}).exec((err,bills) =>{
    if(err){
      return res.status(400).json({
        error:"something went wrong.",
      });
    }
    if(!bills)
    {
      return res.status(401).json({
        error:"No Past orders are found.",
      });
    }
    return res.status(200).json({
      bills,
      message:"Past credit orders.",
    });
  });
};

exports.pastcreditswithitems =(req, res)=>{

  const token = req.headers.authorization;
  var decodedUser = jwt_decoder(token);
  // console.log(decodedUser);
  const owner = decodedUser._id;

  Bill.find({owner_id:owner, status:"completed", products:{$ne:null}},{owner_id:0}).exec((err,bills) =>{
    if(err){
      return res.status(400).json({
        error:"something went wrong.",
      });
    }
    if(!bills)
    {
      return res.status(401).json({
        error:"No Past credit with items are found.",
      });
    }
    return res.status(200).json({
      bills,
      message:"past credits with items are fetched.",
    });
  });
};

exports.notifications =(req, res)=>{

  const token = req.headers.authorization;
  var decodedUser = jwt_decoder(token);
  // console.log(decodedUser);
  const owner_id = decodedUser._id;
  // const today = new Date();
  // console.log(today);

  const start = moment().startOf('day'); // set to 12:00 am today
  const end = moment().endOf('day');
  console.log(start);
  console.log(end);

  Bill.find({expected_time:{$gte: start, $lt: end}},{owner_id:0}).exec((err,bills) =>{
    if(err){
      return res.status(400).json({
        error:"something went wrong.",
      });
    }
    if(!bills)
    {
      return res.status(401).json({
        error:"No bills for today.",
      });
    }
    return res.status(200).json({
      bills,
      message:"Bills for today are fetched.",
    });
  });
};

exports.notificationscount =(req, res)=>{

  const token = req.headers.authorization;
  var decodedUser = jwt_decoder(token);
  // console.log(decodedUser);
  const owner_id = decodedUser._id;
  // const today = new Date();
  // console.log(today);

  const start = moment().startOf('day'); // set to 12:00 am today
  const end = moment().endOf('day');
  console.log(start);
  console.log(end);

  Bill.find({expected_time:{$gte: start, $lt: end}},{owner_id:0}).count().exec((err,count) =>{
    if(err){
      return res.status(400).json({
        error:"something went wrong.",
      });
    }
    return res.status(200).json({
      count,
      message:"notifications count for today are fetched.",
    });
  });
};


exports.duecreditupdate = (req,res) =>{

  var ObjectId = require('mongodb').ObjectId;
  var id = req.params.id;
  var o_id = new ObjectId(id);

  const {customer_phone, nominee_phone, status, totalinterest, totalamountwithinterest, discount, totalamountwithinterestanddiscount, paid_amount,due_amount} = req.body;
  console.log(totalamountwithinterest);

  // "customer_phone":customer_phone, "nominee_phone":nominee_phone, "status":status,"totalinterest":totalinterest, "totalamountwithinterest":totalamountwithinterest, "discount": discount, "totalamountwithinterestanddiscount": totalamountwithinterestanddiscount, "paid_amount":paid_amount

  Bill.findOneAndUpdate({"_id":o_id},{$set:{customer_phone, nominee_phone, status, totalinterest, totalamountwithinterest, discount, totalamountwithinterestanddiscount, paid_amount,due_amount}},{ upsert: true, new: true }).exec((err,bill)=>{
    if(err){
      return res.status(401).json({
        error: "Something went wrong!!",
      });
    }
    return res.status(200).json({
      bill,
      message:"Bill updated successfully.",
    });
  });
};


exports.billdetails =(req, res) =>{
  var ObjectId = require('mongodb').ObjectId;
  var id = req.params.id;
  var o_id = new ObjectId(id);
  console.log(o_id);
  Bill.findOne({"_id":o_id}).exec((err,bill)=>{
    if(err){
      return res.status(401).json({
        error: "Something went wrong!!",
      });
    }
    return res.status(200).json({
      bill,
      message:"Requested bill is fetched successfully.",
    });
  });
};

exports.chart = (req, res) =>{
  Bill.find({}).exec((err,bills)=>{
    if(err){
      return res.status(400).json({
        error:"Something wrong in fetching data",
      });
    }
    return res.status(200).json({
      bills,
      message:"bills fetched successfully.",
    });
  });
};





//
// Bill.findOne({_id:id}).exec((err,bill)=>{
//   if (err) {
//     return res.status(401).json({
//       error: "Something went wrong!!",
//     });
//   }
//   if (!bill) {
//     return res.status(400).json({
//       error: "Some error in finding the Bill. Please try again.",
//     });
//   }
//
//   const newBill = new Bill({owner_id,customer_name, customer_phone, customer_address, customer_father, nominee_name,
//   nominee_address, nominee_phone, total_amount, rateofinterest, expected_time, status});
//
//   newBill.save((err, billData) => {
//     if(err) {
//       console.log(err);
//       return res.status(400).json({
//         error:"something went wrong! Please try again.",
//       });
//     }
//     res.status(200).json({
//       message:"Bill data successfully updated.",
//     });
//   });
// });
