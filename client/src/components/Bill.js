import React, { useState, useEffect, useCallback } from "react";
import Layout from "./Layout";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import {Accordion, Card, Button} from "react-bootstrap";
import moment from "moment";
import { Link, withRouter, useHistory, Redirect, Route } from "react-router-dom";


const Bill = (props) => {
  let history = useHistory();
  const [bill,setBill] = useState([]);
  const [billData, setBillData] =useState({
    customer_phone:"",
    status:"",
    totalinterest:"",
    totalamountwithinterest:"",
    discount:"",
    totalamountwithinterestanddiscount:"",
    paid_amount:"",
    due_amount:"",
    buttonText:"Update",
  })

  const{customer_phone, status, totalinterest, totalamountwithinterest,
     discount, totalamountwithinterestanddiscount, paid_amount,due_amount,buttonText} = billData;

  const id = props.match.params.id;

  const makeApiCall = useCallback(() => {

    axios
      .get(`/bill/${id}`)
      .then((res) => {
        console.log("FETCH BILL SUCCESS!!", res);
        setBill(res.data.bill);
      })
      .catch((err) => {
        if (err && err.response && err.response.data) {
          toast.error(err.response.data.error);
        }
      });
  }, []);

  useEffect(() => {
    makeApiCall();
  }, [makeApiCall]);


  var today = new Date();
  // console.log("date1:", today);
  // const date1 = moment(today).format('DD/MM/YY');
  // console.log(today);
  // const date2  = moment(bill.createdAt).format('DD/MM/YY');
  const date2 = new Date(bill.createdAt);
  const Difference_In_Time = today.getTime() - date2.getTime();
  const Difference_In_Days = Math.ceil(Difference_In_Time / (1000 * 3600 * 24));

  const interest2 = bill.total_amount * (bill.rateofinterest/100) * (Difference_In_Days/365);
  // console.log("interest", interest1);
  // const interest1 = parseFloat(interest2).toFixed(2);
  const interest1 = Math.round(interest2);
  // console.log("interest", interest1);

  const totalamountwithinterest1 = bill.total_amount + interest1;
  // console.log(totalamountwithinterest1);


  const handleChange=(evt)=>{
    console.log(evt.target.value);
    setBillData({
      ...billData,
      [evt.target.name] : evt.target.value,
      totalinterest:interest1,
      totalamountwithinterest:bill.total_amount + interest1,
      totalamountwithinterestanddiscount:bill.total_amount + interest1 - discount,
      due_amount:bill.total_amount + interest1 - discount - paid_amount,
    });
  };


  const handleSubmit =(evt)=>{
    // evt.setDefault();
    setBillData({...billData, buttonText:"Updating..."});
    axios
      .put(`/updatebill/${id}`, {
        customer_phone,
          status,
        totalinterest,
        totalamountwithinterest,
        discount,
        totalamountwithinterestanddiscount,
        paid_amount,
        due_amount,
      })
      .then((res) => {
        console.log("Updated SUCCESSFULLY!!", res);

        setBillData({
          customer_phone:"",
          status:"",
          totalinterest:"",
          totalamountwithinterest:"",
          discount:"",
          totalamountwithinterestanddiscount:"",
          paid_amount:"",
          due_amount:"",
          buttonText:"Update",
        });

        toast.success(res.data.message);
        history.goBack();
      })
      .catch((err) => {
        if (err && err.response && err.response.data) {
          toast.error(err.response.data.error);
        }

        setBillData({
          ...billData,
          buttonText: "Update",
        });
      });
  };




  return(
  <Layout>
  <ToastContainer/>
  <h1>Bill Component</h1>

  <div className="row d-flex justify-content-around">
    <div className="form-group ">
      <label className="text-muted">Customer name</label>
      <input
        name="customer_name"
        value={bill.customer_name}
        type="text"
        className="form-control col border border-info"
      />
    </div>
    <div className="form-group">
      <label className="text-muted">Customer Number</label>
      <input
        onChange={handleChange}
        name="customer_phone"
        value={customer_phone}
        type="number"
        className="form-control border border-info"
        placeholder={bill.customer_phone}
      />
    </div>
    <div className="form-group">
      <label className="text-muted">Customer Address</label>
      <input
        name="customer_address"
        value={bill.customer_address}
        type="text"
        className="form-control border border-info"
      />
    </div>
  </div>

  <div class="row d-flex justify-content-around">
    <div className="form-group ">
      <label className="text-muted">Nominee name</label>
      <input
        name="nominee_name"
        type="text"
        className="form-control col border border-info"
        placeholder={bill.nominee_name}
      />
    </div>
    <div className="form-group">
      <label className="text-muted">Nominee number</label>
      <input
        name="nominee_phone"
        value={bill.nominee_phone}
        type="number"
        className="form-control border border-info"
      />
    </div>
    <div className="form-group">
      <label className="text-muted">Nominee Address</label>
      <input
        name="nominee_address"
        value={bill.nominee_address}
        type="text"
        className="form-control border border-info"
      />
    </div>
  </div>

  {bill.products == null ? (
    <div></div>
  ) : (
    <div className="d-flex justify-content-center">
    <table border="1" className="w-75 border border-info">
    <thead>
      <tr className="d-flex justify-content-between">
        <th className="w-25 d-flex justify-content-center" scope="col">customer Name</th>
        <th className="w-25 d-flex justify-content-center" scope="col">Due amount</th>
        <th className="w-25 d-flex justify-content-center" scope="col">Address</th>
        <th className="w-25 d-flex justify-content-center" scope="col">Phone number</th>
      </tr>
    </thead>
      <tbody>
        {bill.products.map((product) => (
          <div>
            <tr className="d-flex justify-content-between border-info" scope="row">
              <td className="w-25 d-flex justify-content-center">{product.product_name}</td>
              <td className="w-25 d-flex justify-content-center">{product.product_quantity}</td>
              <td className="w-25 d-flex justify-content-center">{product.product_price}</td>
              <td className="w-25 d-flex justify-content-center">{product.net_price}</td>
            </tr>
          </div>
        ))}
        </tbody>
      </table>
      </div>
  )}

  <div class="row d-flex justify-content-around mt-2">
    <div className="form-group">
      <label className="text-muted">Total amount</label>
      <input
        name="total_amount"
        value={bill.total_amount}
        type="number"
        className="form-control border border-info"
      />
    </div>

    <div className="form-group ">
      <label className="text-muted">Interest</label>
      <input
        name="rateofinterest"
        value={bill.rateofinterest}
        type="Number"
        className="form-control border border-info"
      />
    </div>

    <div className="form-group">
      <label className="text-muted">Interest amount</label>
      <input
        onChange ={handleChange}
        name="totalinterest"
        value={interest1}
        type="number"
        className="form-control border border-info"
      />
    </div>
  </div>

  <div className="row d-flex justify-content-around">
    <div className="form-group ">
      <label className="text-muted">Total amount with interest</label>
      <input

        onChange ={handleChange}
        name="totalamountwithinterest"
        value={totalamountwithinterest1}
        type="number"
        className="form-control col border border-info"
      />
    </div>
    <div className="form-group ">
      <label className="text-muted">Discount</label>
      <input

        onChange ={handleChange}
        name="discount"
        value={discount}
        type="number"
        className="form-control col border border-info"
      />
    </div>
    <div className="form-group ">
      <label className="text-muted">Grand total amount</label>
      <input

        onChange ={handleChange}
        name="totalamountwithinterestanddiscount"
        value={totalamountwithinterest1 - discount}
        type="number"
        className="form-control col border border-info"
      />
    </div>


  </div>

  <div className="row d-flex justify-content-around">
    <div className="form-group ">
      <label className="text-muted">Paid amount</label>
      <input
        onChange ={handleChange}
        name="paid_amount"
        value={bill.paid_amount}
        type="text"
        className="form-control col border border-info"
      />
    </div>

    <div className="form-group ">
      <label className="text-muted">Due Amount</label>
      <input
        onChange ={handleChange}
        name="due_amount"
        value={totalamountwithinterest1 - discount -paid_amount}
        type="text"
        className="form-control col border border-info"
      />
    </div>

    <div className="form-group ">
      <label className="text-muted">Status</label>
      <input
        onChange ={handleChange}
        name="status"
        value={status}
        type="text"
        className="form-control col border border-info"
      />
    </div>
  </div>

  <div className="row d-flex justify-content-around">
    <div className="form-group ">
      <label className="text-muted">Amount Taken on</label>
      <input
        name="created_date"
        value={moment(bill.createdAt).format('Do MMMM YYYY')}
        type="text"
        className="form-control col border border-info"
      />
    </div>
    <div className="form-group ">
      <label className="text-muted">No of Days before credit taken</label>
      <input
        name="noofDays"
        value={Difference_In_Days}
        type="number"
        className="form-control col border border-info"
      />
    </div>
  </div>

  <div className="d-flex justify-content-center mt-3 " style={{"height":"50px"}}>
    <button onClick={handleSubmit}
    type="button"
    className="bg-success w-25 font-weight-bold text-white "
    style={{"width":"100px","height":"40px"}}>
    {buttonText}
    </button>
  </div>


  </Layout>
);
};

export default Bill;
