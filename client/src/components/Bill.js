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

    status:"",
    totalinterest:"",
    totalamountwithinterest:"",
    discount:"",
    totalamountwithinterestanddiscount:"",
    paid_amount:"",
    final_due:"",
    buttonText:"Update",
  })

  const{ status, totalinterest, totalamountwithinterest,
     discount, totalamountwithinterestanddiscount, paid_amount,final_due,buttonText} = billData;

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
  console.log(Difference_In_Days);


  const interest2 = bill.total_amount * (bill.rateofinterest/100) * (Difference_In_Days/365);
  // console.log("interest", interest1);
  // const interest1 = parseFloat(interest2).toFixed(2);
  const interest1 = Math.round(interest2);
  // console.log("interest", interest1);

  const totalamountwithinterest1 = bill.due_amount + interest1;
  // console.log(totalamountwithinterest1);


  const handleChange=(evt)=>{
    console.log(evt.target.value);
    setBillData({
      ...billData,
      [evt.target.name] : evt.target.value,
      totalinterest:interest1,
      totalamountwithinterest:bill.due_amount + interest1,
      totalamountwithinterestanddiscount:bill.due_amount + interest1 - discount,
      final_due:bill.due_amount + interest1 - discount - paid_amount,

    });
  };


  const handleSubmit =(evt)=>{
    // evt.setDefault();
    setBillData({...billData, buttonText:"Updating..."});
    axios
      .put(`/updatebill/${id}`, {
        status,
        totalinterest,
        totalamountwithinterest,
        discount,
        totalamountwithinterestanddiscount,
        paid_amount,
        final_due,
      })
      .then((res) => {
        console.log("Updated SUCCESSFULLY!!", res);

        setBillData({
          status:"",
          totalinterest:"",
          totalamountwithinterest:"",
          discount:"",
          totalamountwithinterestanddiscount:"",
          paid_amount:"",
          final_due:"",
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
  <h2 className="mt-2 ml-3">Bill</h2>

  <div className="d-flex justify-content-start mt-3 mb-2 ml-3" >
    <button onClick={() => history.goBack()}
    type="button"
    className="bg-success font-weight-bold text-white "
    >
    Back
    </button>
  </div>

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
        name="customer_phone"
        value={bill.customer_phone}
        type="number"
        className="form-control border border-info"

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
        <th className="w-25 d-flex justify-content-center" scope="col">Product Name</th>
        <th className="w-25 d-flex justify-content-center" scope="col">Product quantity</th>
        <th className="w-25 d-flex justify-content-center" scope="col">Product price</th>
        <th className="w-25 d-flex justify-content-center" scope="col">Net price</th>
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

    <div className="form-group mr-4 ">
      <label className="text-muted">Grand Total Due</label>
      <input
        onChange ={handleChange}
        name="final_due"
        value={totalamountwithinterest1 - discount -paid_amount}
        type="text"
        className="form-control col border border-info bg-warning"
      />
    </div>

    <div className="form-group mr-5">
      <label className="text-muted">Status</label>
      <select id="lang" onChange={handleChange}
        name="status" className="form-control border border-info ">
            <option value="none">None</option>
            <option value="completed">Completed</option>
            <option value="due">Due</option>
            <option value="advance">Advance</option>
            <option value="pending">Pending</option>
      </select>
    </div>
  </div>

  <div className="row d-flex justify-content-around">
    <div className="form-group mr-4 ">
      <label className="text-muted">Due Amount</label>
      <input

        name="due_amount"
        placeholder={bill.due_amount}
        type="text"
        className="form-control col border border-info "
      />
    </div>

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
