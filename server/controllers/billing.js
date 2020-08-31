const Bill = require("../models/billing");
const jwt = require("jsonwebtoken");

exports.billing =(req, res)=>{
    const {customer_name, customer_phone, customer_address, customer_father, nominee_name,
    nominee_address, nominee_phone, products, total_amount, discount, rateofinterest, totalamountwithinterestanddiscount,
    paid_amount, due_amount, expected_time, status} = req.body;

    // const owner_id = user._id;

    const newBill = new Bill({owner_id, customer_name, customer_phone, customer_address, customer_father, nominee_name,
    nominee_address, nominee_phone, products, total_amount, discount, rateofinterest, totalamountwithinterestanddiscount,
    paid_amount, due_amount, expected_time, status});

    newBill.save((err, billData)=>{
      if(err){
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
  // const _id = user._id;
  Bill.find({owner_id:_id, status:"advance"},{_id:1,customer_name:1,due_amount:1, customer_address:1, customer_phone:1}).toArray().exec((err,bill) =>{
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
      result:bills,
    });
  });

};


exports.newcredit =(req, res)=>{
  const {customer_name, customer_phone, customer_address, customer_father, nominee_name,
  nominee_address, nominee_phone, total_amount, rateofinterest, expected_time, status} = req.body;

  // const jwt = localStorage.getItem(token);
  // const _id = jwt.decode(jwt);
  // console.log(_id);
  // const owner_id = _id;

  const jwt_decoder = require('jwt-decode');
  const token = req.headers.authorization;

  var decodedUser = jwt_decoder(token);
  console.log(decodedUser);

  const newBill = new Bill({customer_name, customer_phone, customer_address, customer_father, nominee_name,
  nominee_address, nominee_phone, total_amount, rateofinterest, expected_time, status});

  newBill.save((err, billData)=>{
    if(err){
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
  

  // const _id = user._id;
  Bill.find({owner_id:_id, status:"due", products:{$exists:false}},{_id:0,customer_name:1,due_amount:1, customer_address:1, customer_phone:1}).toArray().exec((err,bill) =>{
    if(err){
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
      result:bills,
    });
  });

};

exports.duecreditwithitems =(req, res)=>{
  // const _id = user._id;
  Bill.find({owner_id:_id, status:"due", products:{$exists:true}},{_id:0,customer_name:1,due_amount:1, customer_address:1, customer_phone:1}).toArray().exec((err,bill) =>{
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
      result:bills,
    });
  });
};

exports.pastcredits =(req, res)=>{
  // const _id = user._id;

  Bill.find({owner_id:_id, status:"completed", products:{$exists:false}},{_id:0,customer_name:1,due_amount:1, customer_address:1, customer_phone:1}).toArray().exec((err,bill) =>{
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
      result:bills,
    });
  });
};

exports.pastcreditswithitems =(req, res)=>{
  // const _id = user._id;
  Bill.find({owner_id:_id, status:"completed", products:{$exists:true}},{_id:0,customer_name:1,due_amount:1, customer_address:1, customer_phone:1}).toArray().exec((err,bill) =>{
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
      result:bills,
    });
  });
};
