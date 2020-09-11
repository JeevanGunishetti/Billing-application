import React, {useState} from "react";
import Layout from "./Layout";
import axios from "axios";
import {toast, ToastContainer} from "react-toastify";

const NewCredit = () =>{
  const [formInputs, setFormInputs] = useState({
    customer_name:"",
    customer_address:"",
    customer_phone:"",
    customer_father:"",
    nominee_name:"",
    nominee_address:"",
    nominee_phone:"",
    total_amount:"",
    rateofinterest:"",
    expected_time:"",
    buttonText:"Save",
  });



  const {customer_name, customer_address, customer_phone,customer_father, nominee_name, nominee_address, nominee_phone, total_amount, rateofinterest, expected_time, buttonText} = formInputs;

  const due_amount = () =>{
    console.log("total_amount", this.state.total_amount);
    const due = this.state.total_amount;
    console.log(due);
    return due;
  };

  const handleChange=(evt)=>{
    setFormInputs({
      ...formInputs,
      [evt.target.name] : evt.target.value,
    });

  };

  const handleSubmit =(evt)=>{
    // evt.setDefault();
    setFormInputs({...formInputs, buttonText:"Saving..."});
    console.log("hello");
    axios
      .post("/newcredit", {
        customer_name,
        customer_address,
        customer_phone,
        customer_father,
        nominee_name,
        nominee_address,
        nominee_phone,
        total_amount,
        rateofinterest,
        expected_time,
      })
      .then((res) => {
        console.log("SAVED SUCCESSFULLY!!", res);

        setFormInputs({
          customer_name:"",
          customer_address:"",
          customer_phone:"",
          customer_father:"",
          nominee_name:"",
          nominee_address:"",
          nominee_phone:"",
          total_amount:"",
          rateofinterest:"",
          expected_time:"",
          buttonText:"Save",
        });

        toast.success(res.data.message);
      })
      .catch((err) => {
        if (err && err.response && err.response.data) {
          toast.error(err.response.data.error);
        }

        setFormInputs({
          ...formInputs,
          buttonText: "Save",
        });
      });
  };

  const creditForm =() => (
    <form>
    <div className="d-flex flex-row">
      <div className="font-weight-bold d-flex flex-column" style={{"width":"30%"}}>
        <label className="d-flex justify-content-end mt-2 px-2.5 py-1">Name</label>
        <label className="d-flex justify-content-end mt-2 px-2.5 py-1">Phone Number</label>
        <label className="d-flex justify-content-end mt-2 px-2.5 ">Address</label>
        <label className="d-flex justify-content-end mt-2 px-2.5 py-2">Son of</label>
        <label className="d-flex justify-content-end mt-1 px-2.5 py-1">Nominee name</label>
        <label className="d-flex justify-content-end mt-2 px-2.5 py-1">Nominee phone</label>
        <label className="d-flex justify-content-end mt-2 px-2.5 ">Nominee Address</label>
        <label className="d-flex justify-content-end mt-2 px-2.5 py-2">Amount</label>
        <label className="d-flex justify-content-end mt-2 px-2.5 ">Rate of interest</label>
        <label className="d-flex justify-content-end mt-2 px-2.5 py-1">Expected Time</label>
        <label className="d-flex justify-content-end mt-2 px-2.5 ">Due Amount</label>
      </div>

      <div className="d-flex flex-column w-50 ml-3">
        <input
        onChange ={handleChange}
        name="customer_name"
        type="text"
        value={customer_name}
        className="form-control mt-2 border border-info"
        />

        <input
        onChange ={handleChange}
        name="customer_phone"
        maxLength={10}
        minLength ="10"
        type="number"
        value={customer_phone}
        className="form-control mt-2 border border-info"
        />

        <input
        onChange ={handleChange}
        name="customer_address"
        type="text"
        value={customer_address}
        className="form-control mt-2 border border-info"
        />

        <input
        onChange ={handleChange}
        name="customer_father"
        type="text"
        value={customer_father}
        className="form-control mt-2 border border-info"
        />

        <input
        onChange ={handleChange}
        name="nominee_name"
        type="text"
        value={nominee_name}
        className="form-control mt-2 border border-info"
        />

        <input
        onChange ={handleChange}
        name="nominee_phone"
        type="number"
        value={nominee_phone}
        className="form-control mt-2 border border-info"
        />

        <input
        onChange ={handleChange}
        name="nominee_address"
        type="text"
        value={nominee_address}
        className="form-control mt-2 border border-info"
        />

        <input
        onChange ={handleChange}
        name="total_amount"
        type="number"
        value={total_amount}
        className="form-control mt-2 border border-info"
        />

        <input
        onChange ={handleChange}
        name="rateofinterest"
        type="number"
        value={rateofinterest}
        className="form-control mt-2 border border-info"
        />

        <input
        onChange ={handleChange}
        name="expected_time"
        type="date"
        value={expected_time}
        className="form-control mt-2 border border-info"
        />

        <input
        disabled
        name="due_amount"
        type="text"
        value={total_amount * rateofinterest}
        className="form-control mt-2 border border-info"
        />

        <div>
          <button
          onClick={handleSubmit}
          type="button"
          className="bg-success text-white mt-3"
          style={{"width":"100px","height":"40px"}}
          >
          {buttonText}
          </button>
        </div>

      </div>
    </div>
    </form>
  );

      // <div>
      //   <label>Name:</label>
      //   <input
      //   onChange ={handleChange}
      //   name="customer_name"
      //   type="text"
      //   value={customer_name}
      //   />
      // </div>
      // <div>
      //   <label>Phone Number:</label>
      //   <input
      //   onChange ={handleChange}
      //   name="customer_phone"
      //   type="number"
      //   value={customer_phone}
      //   />
      // </div>
      // <div>
      //   <label>Address:</label>
      //   <input
      //   onChange ={handleChange}
      //   name="customer_address"
      //   type="text"
      //   value={customer_address}
      //   />
      // </div>
      // <div>
      //   <label>Son of:</label>
      //   <input
      //   onChange ={handleChange}
      //   name="customer_father"
      //   type="text"
      //   value={customer_father}
      //   />
      // </div>
      // <div>
      //   <label>Nominee name:</label>
      //   <input
      //   onChange ={handleChange}
      //   name="nominee_name"
      //   type="text"
      //   value={nominee_name}
      //   />
      // </div>
      //
      // <div>
      //   <label>Nominee Address:</label>
      //   <input
      //   onChange ={handleChange}
      //   name="nominee_address"
      //   type="text"
      //   value={nominee_address}
      //   />
      // </div>
      // <div>
      //   <label>Nominee phone:</label>
      //   <input
      //   onChange ={handleChange}
      //   name="nominee_phone"
      //   type="number"
      //   value={nominee_phone}
      //   />
      // </div>
      // <div>
      //   <label>Amount:</label>
      //   <input
      //   onChange ={handleChange}
      //   name="total_amount"
      //   type="number"
      //   value={total_amount}
      //   />
      // </div>
      // <div>
      //   <label>Rate of interest:</label>
      //   <input
      //   onChange ={handleChange}
      //   name="rateofinterest"
      //   type="number"
      //   value={rateofinterest}
      //   />
      // </div>
      // <div>
      //   <label>Expected Time:</label>
      //   <input
      //   onChange ={handleChange}
      //   name="expected_time"
      //   type="text"
      //   value={expected_time}
      //   />
      // </div>
      // <div>
      //   <label>due-Amount</label>
      //   <input
      //   name="due_amount"
      //   type="text"
      //   value={due_amount}
      //   />
      // </div>
      // <div>
      //   <button onClick={handleSubmit} type="button">{buttonText}</button>
      // </div>


  return(
  <Layout>
    <ToastContainer/>
    <h2 className="ml-3 mt-2">New Credit</h2>
    {creditForm()}
    </Layout>
);
};

// const NewCredit=()=>{
//   return(
//   <Layout>
//   <h1>Notes Component</h1>
//   <h3>Notes component is under development. It is coming soon.</h3>
//   </Layout>
// );
// };

export default NewCredit;
