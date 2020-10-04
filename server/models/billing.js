const {Schema, model} = require("mongoose");

const BillSchema = new Schema(
  {

    customer_name: {
      type:String,
      trim:true,
      // required:true,
      max:32,
    },
    customer_address: {
      type:String,
      trim:true,

      // required:true,
      lowercase:false,
    },
    customer_father: {
      type:String,
      trim:true,
      lowercase:false,
    },
    customer_phone: {
      type:Number,
      trim:true,
      // required:true,
      // min:10,
      // max:9999999999,

    },
    nominee_name: {
      type:String,
      trim:true,
      max:32,
    },
    nominee_address: {
      type:String,
      trim:true,

    },
    nominee_phone: {
      type:Number,
      trim:true,

    },
    products:{
      type:Array,
      default:[],
    },
    total_amount: {
      type:Number,
      trim:true,

    },
    discount:{
      type:Number,
      trim:true,
    },
    totalamountafterdiscount:{
      type:Number,
      trim:true,
    },
    rateofinterest:{
      type:Number,
      trim:true,
    },
    totalinterest:{
      type:Number,
      trim:true,
    },
    totalamountwithinterest:{
      type:Number,
      trim:true,
    },
    totalamountwithinterestanddiscount:{
      type:Number,
      trim:true,
    },
    paid_amount:{
      type:Number,
    },
    due_amount:{
      type:Number,
    },
    expected_time:{
      type:Date,
    },
    status:{
      type:String,
      trim:true,
    },
    updated: {
      type: Date,
      default: Date.now
    },
    owner_id:{
      type:String,
      trim:true,
      unique:false,
      lowercase:true,
    },
  },
  { timestamps: true}
);

module.exports = model("Bill", BillSchema);
