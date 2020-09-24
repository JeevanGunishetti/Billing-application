import React, { useState } from "react";
import Layout from "./Layout";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

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
    totalamountafterdiscount,
    buttonText,
  } = formInputs;

  const handleChange = (evt) => {
    console.log(evt.target.value);
    setFormInputs({
      ...formInputs,
      [evt.target.name]: evt.target.value,

      products:[...testArr],
    });
  };

  // const handleStatusrTypeChange = (e) => console.log((statusrtype[e.target.value]));

  const handleSubmit = (evt) => {
    // evt.setDefault();
    setFormInputs({ ...formInputs, buttonText: "Saving..." });
    console.log("hello");
    console.log(...testArr);
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
          totalamountafterdiscount: "",
          buttonText: "Save",
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

  const addProduct = (evt) => {
    // evt.setDefault();
    console.log("hello");
    var obj = {
      product_name,
      product_quantity,
      product_price,
      net_price,
    };

    var data = testArr;
    // data.push(obj);
    data.concat(obj);
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
  // <Dropdown
  //   options={options}
  //   name="status"
  //   value={status}
  //   placeholder="Select an option"
  //   className="border border-info"
  // />

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
                // <div key={item.id} className="col-12">
                //   <div className="control-group mb-1">
                //     <span className="mr-2">
                //       {item.start} - {item.stop}
                //     </span>
                // {/* <input
                //   type="button"
                //   className="btn btn-light"
                //   value="Delete row"
                //   onClick={(e) => deleteRow(index, e)}
                // /> */}
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
              name="total_amount"
              value={total_amount}
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

          <div className="form-group ml-5">
            <label className="">Rate of Interest</label>
            <input
              onChange={handleChange}
              name="rateofinterest"
              value={rateofinterest}
              type="number"
              className="form-control border border-info"
            />
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

//
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
//
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
//   name="nomineeaddress"
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
