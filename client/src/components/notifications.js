import React, { useState, useEffect, useCallback } from "react";
import Layout from "./Layout";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import {Accordion, Card, Button} from "react-bootstrap";
import moment from "moment";
// import { Link, withRouter } from "react-router-dom";


const Notifications=()=>{
  const [bills,setBills] = useState([]);
  // const [search, setSeach] = useState('');
  // const [filteredBills, setFilteredBills] = useState([]);

  const makeApiCall = useCallback(() => {
    axios
      .get("/notifications")
      .then((res) => {
        console.log("FETCH BILLS SUCCESS!!", res);
        setBills(res.data.bills);
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

  // useEffect(()=>{
  //   setFilteredBills(
  //     bills.filter(bill => {
  //       return bill.customer_name.toLowerCase().includes(search.toLowerCase()) || bill.customer_address.toLowerCase().includes(search.toLowerCase()) || bill.customer_phone.toString().includes(search.toString())
  //     })
  //   )
  // },[search,bills]);

  // <div >
  // <form class="form-inline mt-2 mr-3 d-flex justify-content-center">
  //   <input class="form-control mr-sm-2 w-50 border border-success" type="search" placeholder="Search" onChange={e=>setSeach(e.target.value)} aria-label="Search"/>
  // </form>
  // </div>

  const length = bills.length;

  return(
  <Layout>
  <h2 className="ml-2 mt-2">Notifications</h2>

  {!bills.length ? (
    <li>There are no notifications for today.</li>
  ) : (
    <Accordion defaultActiveKey="0" className="">
    <div className="mt-3">
      <table border="1" className="w-100">
      <thead>
        <tr className="d-flex justify-content-between">
          <th className="w-25 d-flex justify-content-center" scope="col">customer Name</th>
          <th className="w-25 d-flex justify-content-center" scope="col">Due amount</th>
          <th className="w-25 d-flex justify-content-center" scope="col">Address</th>
          <th className="w-25 d-flex justify-content-center" scope="col">Phone number</th>
        </tr>
      </thead>
        <tbody>
          {bills.map((bill) => (
          <Card className="">
            <Accordion.Toggle as={Card.Header} eventKey={bill._id} className="">
            <div className="">
              <tr key={bill._id} className="d-flex justify-content-between bg-info text-white" scope="row">
                <td className="w-25 d-flex justify-content-center">{bill.customer_name}</td>
                <td className="w-25 d-flex justify-content-center">{bill.total_amount}</td>
                <td className="w-25 d-flex justify-content-center">{bill.customer_address}</td>
                <td className="w-25 d-flex justify-content-center">{bill.customer_phone}</td>
              </tr>
            </div>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey={bill._id}>
              <Card.Body  className="">

              <div className="row d-flex justify-content-around mt-2">
                <div className="form-group ">
                  <label className="text-muted">Customer name</label>
                  <input
                    name="customer_name"
                    value={bill.customer_name}
                    type="text"
                    className="form-control col"
                  />
                </div>
                <div className="form-group">
                  <label className="text-muted">Customer Number</label>
                  <input
                    name="customer_phone"
                    type="number"
                    className="form-control"
                    placeholder={bill.customer_phone}
                  />
                </div>
                <div className="form-group">
                  <label className="text-muted">Customer Address</label>
                  <input
                    name="customer_address"
                    value={bill.customer_address}
                    type="text"
                    className="form-control"
                  />
                </div>
              </div>

              <div class="row d-flex justify-content-around">
                <div className="form-group ">
                  <label className="text-muted">Nominee name</label>
                  <input

                    name="nominee_name"

                    type="text"
                    className="form-control col"
                    placeholder={bill.nominee_name}
                  />
                </div>
                <div className="form-group">
                  <label className="text-muted">Nominee number</label>
                  <input
                    name="nominee_name"
                    value={bill.nominee_phone}
                    type="number"
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label className="text-muted">Nominee Address</label>
                  <input
                    name="nominee_address"
                    value={bill.nominee_address}
                    type="text"
                    className="form-control"
                  />
                </div>
              </div>

              <div class="row d-flex justify-content-around">
                <div className="form-group">
                  <label className="text-muted">Total amount</label>
                  <input
                    name="total_amount"
                    value={bill.total_amount}
                    type="number"
                    className="form-control"
                  />
                </div>

                <div className="form-group ">
                  <label className="text-muted">Interest</label>
                  <input
                    name="rateofinterest"
                    value={bill.rateofinterest}
                    type="Number"
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label className="text-muted">Total amount with interest</label>
                  <input
                    name="totalamountwithinterestanddiscount"
                    value={bill.totalamountwithinterestanddiscount}
                    type="number"
                    className="form-control"
                  />
                </div>
              </div>

              <div className="row d-flex justify-content-around">
                <div className="form-group ">
                  <label className="text-muted">Paid amount</label>
                  <input
                    name="paid_amount"
                    value={bill.paid_amount}
                    type="text"
                    className="form-control col"
                  />
                </div>

                <div className="form-group ">
                  <label className="text-muted">Amount Taken on</label>
                  <input
                    name="created_date"
                    value={moment(bill.createdAt).format('Do MMMM YYYY')}
                    type="text"
                    className="form-control col"
                  />
                </div>
                <div className="form-group ">
                  <label className="text-muted">No of Days before credit taken</label>
                  <input
                    name="noofDays"
                    value={moment(bill.updatedAt).format("Do MMMM YY")}
                    type="text"
                    className="form-control col"
                  />
                </div>
              </div>

              </Card.Body>
            </Accordion.Collapse>
          </Card>
          ))}


        </tbody>
      </table>
    </div>
    </Accordion>
  )}
  </Layout>
);
};

export default Notifications;
