import React, { Fragment, useState, useEffect, useCallback } from "react";
import { Link, withRouter } from "react-router-dom";
import { isAuth, signout } from "../utils/helpers";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import {Accordion, Card, Button} from "react-bootstrap";
import moment from "moment";

const Layout = ({ children, match, history }) => {
  const isMatch = (path) => {
    if (match.path === path) {
      return { color: "#f08a5d" };
    } else {
      return { color: "#fff" };
    }
  };

  const [count,setCount] = useState([]);
  const [bills,setBills] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredBills, setFilteredBills] = useState([]);

  const makeApiCall = useCallback(() => {
    axios
      .get("/count")
      .then((res) => {
        console.log("FETCH COUNT SUCCESS!!", res);
        setCount(res.data.count);
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



  const makeApiCall2 = useCallback(() => {
    axios
      .get("chart")
      .then((res) => {
        console.log("FETCH search bills SUCCESS!!", res);

        setBills(res.data.bills);
      })
      .catch((err) => {
        if (err && err.response && err.response.data) {
          toast.error(err.response.data.error);
        }
      });
  }, []);

  useEffect(() => {
    makeApiCall2();
  }, [makeApiCall2]);

  useEffect(()=>{
    setFilteredBills(
      bills.filter(bill => {
        return bill.customer_name.toLowerCase().includes(search.toLowerCase()) || bill.customer_address.toLowerCase().includes(search.toLowerCase()) || bill.customer_phone.toString().includes(search.toString())
      })
    )
  },[search,bills]);

  // console.log(search.length);
  const nav = () => (
    <ul className="nav nav-tabs bg-dark font-weight-bold justify-content-between sticky-top">
      <div className="d-flex flex-row">
      <li className="nav-item navbar-brand">
        <Link to="/" className="nav-link" style={isMatch("/")}>
          Home
        </Link>
      </li>

      <li className="nav-item mt-2">
        <Link
          to="/about"
          className="nav-link"
          style={isMatch("/about")}
        >
          About
        </Link>
      </li>

      {!isAuth() && (
        <>

          <li className="nav-item  mt-2">
            <Link to="/signin" className="nav-link" style={isMatch("/signin")}>
              Signin
            </Link>
          </li>
          <li className="nav-item  mt-2">
            <Link to="/signup" className="nav-link" style={isMatch("/signup")}>
              Signup
            </Link>
          </li>
        </>
      )}

      {isAuth() && (
        <>


          <li className="nav-item mt-2">
            <Link
              to="/profile"
              className="nav-link"
              style={isMatch("/profile")}
            >
              Profile
            </Link>
          </li>

          <li className="nav-item mt-2">
            <Link
              to="/notifications"
              className="nav-link"
              style={isMatch("/notifications")}
            >
              Notifications<span className="right badge badge-danger ml-1">{count}</span>
            </Link>
          </li>

          <li className="nav-item mt-2">
            <span
              className="nav-link"
              style={{ cursor: "pointer", color: "#fff" }}
              onClick={() => {
                signout(() => {
                  history.push("/");
                });
              }}
            >
              Signout
            </span>
          </li>
        </>
      )}
      </div>
      <div>

      <form class="form-inline mt-2 mr-3 d-flex justify-content-center">
        <input class="form-control mr-sm-2 border border-success " type="search" placeholder="Search" onChange={e=>setSearch(e.target.value)} aria-label="Search"/>
      </form>
      </div>
    </ul>
  );
  //
  // <form class="form-inline mt-2 mr-3">
  //   <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
  //   <button class="btn btn-outline-success my-2 my-sm-0 text-white bg-success" type="submit">Search</button>
  // </form>
  const sidebar =()=>(
    <aside className="bg-dark col-es-1 col-sm-2 col-md-2 font-weight-bold" style={{"fontSize":20}} >
        {/* Brand Logo */}

        {/* Sidebar */}
        <div className="sidebar">
          {/* Sidebar user (optional) */}

          {/* Sidebar Menu */}
          <nav className="mt-2">
            <ul
              className="nav nav-tabs nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              {/* Add icons to the links using the .nav-icon class
           with font-awesome or any other icon font library */}
              <li className="nav-item has-treeview mt-2">
                <Link to="/billing" className="nav-link" style={isMatch("/billing")}>Billing </Link>
              </li>
              <li className="nav-item mt-2">
                <Link to="/advanceorders" className="nav-link" style={isMatch("/advanceorders")}>Advance orders </Link>
              </li>
              <li className="nav-item mt-2">
                <Link to="/newcredit" className="nav-link" style={isMatch("/newcredit")}>New Credit </Link>
              </li>
              <li className="nav-item mt-2">
                <Link to="/duecredits" className="nav-link" style={isMatch("/duecredits")}>Due Credits </Link>
              </li>
              <li className="nav-item mt-2">
                <Link to="/duecreditwithitems" className="nav-link" style={isMatch("/duecreditwithitems")}>Due Credits with item </Link>
              </li>
              <li className="nav-item mt-2">
                <Link to="/pastcredits" className="nav-link" style={isMatch("/pastcredits")}>Past credits </Link>
              </li>
              <li className="nav-item mt-2">
                <Link to="/pastcreditswithitems" className="nav-link" style={isMatch("/pastcreditswithitems")}>Past credits with items </Link>
              </li>
              <li className="nav-item mt-2">
                <Link to="/calculator" className="nav-link" style={isMatch("/calculator")}>Calculator </Link>
              </li>
              <li className="nav-item mt-2">
                <Link to="/notes" className="nav-link" style={isMatch("/notes")}>Notes <span className="right badge badge-danger">Coming soon</span></Link>
              </li>


            </ul>
          </nav>
          {/* /.sidebar-menu */}
        </div>
        {/* /.sidebar */}
      </aside>

  );

  return (
    <Fragment>
      {nav()}
      <div className="d-flex" style={{}}>
        {sidebar()}
        {!search.length ?
          (<div className="col-sm-10 col-md-10" style={{background:"#d2f6c5"}}>{children}</div>)
          :(
            <Accordion defaultActiveKey="0" className="ml-5 mt-3 w-75">
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
                  {filteredBills.map((bill) => (
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
                      <div className="d-flex justify-content-end">
                        <Link className="btn btn-primary bg-success" to={`/bill/${bill._id}`} >
                          view/edit the bill
                          <i className="fas fa-chevron-right" />
                        </Link>
                      </div>
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

          )
        }
      </div>
    </Fragment>
  );
};

export default withRouter(Layout);
