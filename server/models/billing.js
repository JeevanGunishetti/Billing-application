const {Schema, model} = require("mongoose");

const BillSchema = new Schema(
  {
    owner_id:{
      type:String,
      trim:true,
      unique:true,
      lowercase:true,
    },
    customer_name: {
      type:String,
      trim:true,
      required:true,
      max:32,
    },
    customer_address: {
      type:String,
      trim:true,
      required:true,
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
      required:true,
      min:10,
      max:10,
    },
    nominee_name: {
      type:String,
      trim:true,
      max:32,
    },
    nominee_address: {
      type:String,
      trim:true,
      lowercase:false,
    },
    nominee_phone: {
      type:Number,
      trim:true,
      min:10,
      max:10,
    },
    products:[{
        product_name:{
          type:String,
          trim:true,
        },
        product_quantity:{
          type:String,
          trim:true,
        },
        product_price:{
          type:String,
          trim:true,
        },
        net_price:{
          type:String,
          trim:true,
        },
    }],
    total_amount: {
      type:Number,
      trim:true,
      required:true,
    },
    discount:{
      type:Number,
      trim:true,
    },
    rateofinterest:{
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
      required:true,
      trim:true,
    },
    updated: {
      type: Date,
      default: Date.now
    },
  },
  { timestamps: true}
);

module.exports = model("Bill", BillSchema);
