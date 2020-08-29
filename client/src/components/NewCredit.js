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

  const handleChange=(evt)=>{
    setFormInputs({
      ...formInputs,
      [evt.target.name] : evt.target.value,
    });
  };

  const handleSubmit =(evt)=>{
    evt.setDefault();
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
      <div>
        <label>Name:</label>
        <input
        onChange ={handleChange}
        name="customer_name"
        type="text"
        value={customer_name}
        />
      </div>
      <div>
        <label>Phone Number:</label>
        <input
        onChange ={handleChange}
        name="customer_phone"
        type="number"
        value={customer_phone}
        />
      </div>
      <div>
        <label>Address:</label>
        <input
        onChange ={handleChange}
        name="customer_address"
        type="text"
        value={customer_address}
        />
      </div>
      <div>
        <label>Son of:</label>
        <input
        onChange ={handleChange}
        name="customer_father"
        type="text"
        value={customer_father}
        />
      </div>
      <div>
        <label>Nominee name:</label>
        <input
        onChange ={handleChange}
        name="nominee_name"
        type="text"
        value={nominee_name}
        />
      </div>

      <div>
        <label>Nominee Address:</label>
        <input
        onChange ={handleChange}
        name="nomineeaddress"
        type="text"
        value={nominee_address}
        />
      </div>
      <div>
        <label>Nominee phone:</label>
        <input
        onChange ={handleChange}
        name="nominee_phone"
        type="number"
        value={nominee_phone}
        />
      </div>
      <div>
        <label>Amount:</label>
        <input
        onChange ={handleChange}
        name="total_amount"
        type="number"
        value={total_amount}
        />
      </div>
      <div>
        <label>Rate of interest:</label>
        <input
        onChange ={handleChange}
        name="rateofinterest"
        type="number"
        value={rateofinterest}
        />
      </div>
      <div>
        <label>Expected Time:</label>
        <input
        onChange ={handleChange}
        name="expected_time"
        type="text"
        value={expected_time}
        />
      </div>
      <div>
        <button onChange={handleSubmit} type="button">{buttonText}</button>
      </div>
    </form>
  );

  return(
  <Layout>
    <ToastContainer/>
    <h2>New Credit</h2>
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
