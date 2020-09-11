import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { isAuth, signout } from "../utils/helpers";

const Layout = ({ children, match, history }) => {
  const isMatch = (path) => {
    if (match.path === path) {
      return { color: "#f08a5d" };
    } else {
      return { color: "#fff" };
    }
  };

  const nav = () => (
    <ul className="nav nav-tabs bg-primary justify-content-between">
      <div className="d-flex flex-row">
      <li className="nav-item navbar-brand">
        <Link to="/" className="nav-link" style={isMatch("/")}>
          Home
        </Link>
      </li>

      {!isAuth() && (
        <>

          <li className="nav-item  mt-3">
            <Link to="/signin" className="nav-link" style={isMatch("/signin")}>
              Signin
            </Link>
          </li>
          <li className="nav-item  mt-3">
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
              to="/dashboard"
              className="nav-link"
              style={isMatch("/dashboard")}
            >
              Dashboard
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
      <form class="form-inline mt-2 mr-3">
        <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
        <button class="btn btn-outline-success my-2 my-sm-0 text-white bg-success" type="submit">Search</button>
      </form>
      </div>
    </ul>
  );

  const sidebar =()=>(
    <aside className="bg-dark col-es-1 col-sm-2 col-md-2 font-weight-bold " style={{"fontSize":20}} >
        {/* Brand Logo */}

        {/* Sidebar */}
        <div className="sidebar">
          {/* Sidebar user (optional) */}

          {/* Sidebar Menu */}
          <nav className="mt-2">
            <ul
              className="nav nav-pills nav-sidebar flex-column"
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
      <div className="d-flex">
        {sidebar()}
        <div className="col-sm-10 col-md-9">{children}</div>
      </div>
    </Fragment>
  );
};

export default withRouter(Layout);
