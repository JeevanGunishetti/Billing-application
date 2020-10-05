import React, { useState } from "react";
import Layout from "./Layout";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

// added
const Billing = () => {
  const [formInputs, setFormInputs] = useState({
    customer_name: "",
    customer_address: "",
    customer_phone: "",
    customer_father: "",
    nominee_name: "",
    nominee_address: "",
    nominee_phone: "",
    total_amount: "",
    rateofinterest: "",
    expected_time: "",
    discount: "",
    totalamountafterdiscount: "",
    status: "",
    products:[],
    product_name: "",
    product_quantity: "",
    product_price: "",
    net_price: "",
    due_amount:"",
    paid_amount:"",
    buttonText: "Save",
  });
  const [testArr, setTestArr] = useState([]);
  let tp = [];

  // const [statusrtype, setStatusrtype] = useState(["due", "completed", "advance","pending"])
  // const status = statusrtype.map(Status => Status
  // )
  const {
    customer_name,
    customer_address,
    customer_phone,
    customer_father,
    nominee_name,
    nominee_address,
    nominee_phone,
    total_amount,
    rateofinterest,
    status,
    products,
    product_name,
    product_quantity,
    product_price,
    net_price,
    expected_time,
    discount,
    due_amount,
    paid_amount,
    totalamountafterdiscount,
    buttonText,
  } = formInputs;

  const handleChange = (evt) => {
  //  console.log(evt.target.value);
    setFormInputs({
      ...formInputs,
      [evt.target.name]: evt.target.value,

      products:[...testArr],
      total_amount:total_amount2,
      due_amount: total_amount - discount - paid_amount,
    });
  };

  // const handleStatusrTypeChange = (e) => console.log((statusrtype[e.target.value]));

  const handleSubmit = (evt) => {
    // evt.setDefault();
    setFormInputs({ ...formInputs, buttonText: "Saving..." });
  //  console.log("hello");
   // console.log(...testArr);
    axios
      .post("/billing", {
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
        discount,
        status,
        products,
        due_amount,
        totalamountafterdiscount,
      })
      .then((res) => {
        console.log("SAVED SUCCESSFULLY!!", res);

        setFormInputs({
          customer_name: "",
          customer_address: "",
          customer_phone: "",
          customer_father: "",
          nominee_name: "",
          nominee_address: "",
          nominee_phone: "",
          total_amount: "",
          rateofinterest: "",
          expected_time: "",
          discount: "",
          status: "",
          products:[],
          product_name: "",
          product_quantity: "",
          product_price: "",
          net_price: "",
          due_amount:"",
          paid_amount:"",
          totalamountafterdiscount: "",
          buttonText: "Save",
        });
        setTestArr([]);

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


  const addProduct = (evt) => {
    // evt.setDefault();
   // console.log("hello");
    var obj = {
      product_name,
      product_quantity,
      product_price,
      net_price: product_quantity * product_price,
    };

    var data = testArr;
    data.push(obj);
    tp.push(obj);

    setTestArr([...data]);
    setFormInputs({
      ...formInputs,
      products:[...data],
      product_name: "",
      product_quantity: "",
      product_price: "",
      net_price: "",
    });
  };

  const options = [
    { value: "none", label: "None" },
    { value: "completed", label: "Completed" },
    { value: "due", label: "Due" },
    { value: "advance", label: "Advance" },
    { value: "pending", label: "Pending" },
  ];

  const defaultOption = options[0];

  let total_amount2=0;
  testArr.map((item) => total_amount2 = total_amount2 + item.net_price);
  // console.log("total 2 " + total_amount2);

  const creditForm = () => (
    <div>
      <form className="font-weight-bold mt-3 ml-3">
        <div className="row d-flex justify-content-between">
          <div className="form-group ">
            <label className="">Customer name</label>
            <input
              onChange={handleChange}
              name="customer_name"
              value={customer_name}
              type="text"
              className="form-control border border-info"
            />
          </div>
          <div className="form-group">
            <label className="">Customer Number</label>
            <input
              onChange={handleChange}
              name="customer_phone"
              value={customer_phone}
              type="number"
              className="form-control border border-info"
            />
          </div>
          <div className="form-group">
            <label className="">Customer father</label>
            <input
              onChange={handleChange}
              name="customer_father"
              value={customer_father}
              type="text"
              className="form-control border border-info"
            />
          </div>
        </div>

        <div className="d-flex flex-row mt-3">
          <label className="pt-1">Customer address</label>
          <input
            onChange={handleChange}
            name="customer_address"
            value={customer_address}
            type="text"
            className="w-75 form-control ml-3 border border-info"
          />
        </div>

        <div class="row d-flex justify-content-between mt-3">
          <div className="form-group ">
            <label className="">Nominee name</label>
            <input
              onChange={handleChange}
              name="nominee_name"
              value={nominee_name}
              type="text"
              className="form-control border border-info"
            />
          </div>
          <div className="form-group">
            <label className="">Nominee number</label>
            <input
              onChange={handleChange}
              name="nominee_phone"
              value={nominee_phone}
              type="number"
              className="form-control border border-info"
            />
          </div>
          <div className="form-group">
            <label className="">Nominee Address</label>
            <input
              onChange={handleChange}
              name="nominee_address"
              value={nominee_address}
              type="text"
              className="form-control border border-info"
            />
          </div>
        </div>
        <div class="row d-flex justify-content-between mt-3">
          <input
            onChange={handleChange}
            name="product_name"
            value={product_name}
            type="text"
            placeholder="Product Name"
            className="form-control border border-info w-25"
          />
          <input
            onChange={handleChange}
            name="product_quantity"
            value={product_quantity}
            type="Number"
            placeholder="Product quantity"
            className="form-control border border-info w-25"
          />
          <input
            onChange={handleChange}
            name="product_price"
            value={product_price}
            type="Number"
            placeholder="Product price"
            className="form-control border border-info w-25"
          />

          <button
            onClick={addProduct}
            type="button"
            className="bg-success w-25 font-weight-bold text-white"
            style={{ width: "100px", height: "40px" }}
          >
            Add product
          </button>
        </div>
        <div className="ml-3 mt-3">
          <table border="1" className="w-100">
            <thead>
              <tr className="d-flex justify-content-between">
                <th className="w-25 d-flex justify-content-center" scope="col">
                  Product Name
                </th>
                <th className="w-25 d-flex justify-content-center" scope="col">
                  Product quantity
                </th>
                <th className="w-25 d-flex justify-content-center" scope="col">
                  Product Price
                </th>
                <th className="w-25 d-flex justify-content-center" scope="col">
                  Net amount
                </th>
              </tr>
            </thead>
            <tbody>
              {testArr.map((item, index) => (

                <tr className="d-flex justify-content-between" scope="row">
                  <td className="w-25 d-flex justify-content-center">
                    {item.product_name}
                  </td>
                  <td className="w-25 d-flex justify-content-center">
                    {item.product_quantity}
                  </td>
                  <td className="w-25 d-flex justify-content-center">
                    {item.product_price}
                  </td>
                  <td className="w-25 d-flex justify-content-center">
                    {item.product_quantity * item.product_price}
                  </td>
                </tr>
                // </div>
                // </div>
              ))}
            </tbody>
          </table>
        </div>

        <div className="row d-flex justify-content-between mt-5">
          <div className="form-group ">
            <label className="">Total Amount</label>
            <input
              onChange={handleChange}
              name="total_amount2"
              value={total_amount2}
              type="number"
              className="form-control border border-info"
            />
          </div>
          <div className="form-group">
            <label className="">Discount</label>
            <input
              onChange={handleChange}
              name="discount"
              value={discount}
              type="number"
              className="form-control border border-info"
            />
          </div>
          <div className="form-group">
            <label className="">Total amount after discount</label>
            <input
              onChange={handleChange}
              name="totalamountafterdiscount"
              value={total_amount - discount}
              type="number"
              className="form-control border border-info"
            />
          </div>
        </div>

        <div className="row d-flex justify-content-between mt-5">
          <div className="form-group ">
            <label className="">Paid Amount</label>
            <input
              onChange={handleChange}
              name="paid_amount"
              value={paid_amount}
              type="number"
              className="form-control border border-info"
            />
          </div>
          <div className="form-group">
            <label className="">Due Amount</label>
            <input

              name="due_amount"
              value={total_amount - discount - paid_amount}
              type="number"
              className="form-control border border-info"
            />
          </div>
          <div className="form-group">
            <label className="">Rate of Interest</label>
            <input
              onChange={handleChange}
              name="rateofinterest"
              value={rateofinterest}
              type="number"
              className="form-control border border-info"
            />
          </div>
        </div>

        <div className="row d-flex justify-content-between">
          <div className="form-group">
            <label className="">Status</label>
            <select id="lang" onChange={handleChange}
              name="status" className="form-control border border-info ">
                  <option value="none">None</option>
                  <option value="completed">Completed</option>
                  <option value="due">Due</option>
                  <option value="advance">Advance</option>
                  <option value="pending">Pending</option>
            </select>
          </div>


          <div className="form-group">
            <label className="">Expected date</label>
            <input
              onChange={handleChange}
              name="expected_time"
              value={expected_time}
              type="date"
              className="form-control border border-info"
            />
          </div>
        </div>

        <div
          className="d-flex justify-content-center mt-3 "
          style={{ height: "50px" }}
        >
          <button
            onClick={handleSubmit}
            type="button"
            className="bg-success w-25 font-weight-bold text-white "
            style={{ width: "100px", height: "40px" }}
          >
            {buttonText}
          </button>
        </div>
      </form>
    </div>
  );

  return (
    <Layout>
      <ToastContainer />
      <h2 className="ml-2 mt-2 font-weight-bold">Billing</h2>
      {creditForm()}
    </Layout>
  );
};

export default Billing;
