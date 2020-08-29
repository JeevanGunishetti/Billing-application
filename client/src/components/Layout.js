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
    <ul className="nav nav-tabs bg-primary">
      <li className="nav-item">
        <Link to="/" className="nav-link" style={isMatch("/")}>
          Home
        </Link>
      </li>
      {!isAuth() && (
        <>
          <li className="nav-item">
            <Link to="/signin" className="nav-link" style={isMatch("/signin")}>
              Signin
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/signup" className="nav-link" style={isMatch("/signup")}>
              Signup
            </Link>
          </li>
        </>
      )}

      {isAuth() && (
        <>
          <li className="nav-item">
            <Link
              to="/dashboard"
              className="nav-link"
              style={isMatch("/dashboard")}
            >
              Dashboard
            </Link>
          </li>

          <li className="nav-item">
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
    </ul>
  );

  const sidebar =()=>(
    <aside className="bg-dark col-es-1 col-sm-2 col-md-2" >
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
              <li className="nav-item has-treeview">
                <Link to="/billing" className="nav-link" style={isMatch("/billing")}>Billing <span className="right badge badge-danger">Coming soon</span></Link>
              </li>
              <li className="nav-item">
                <Link to="/advanceorders" className="nav-link" style={isMatch("/advanceorders")}>Advance orders <span className="right badge badge-danger">Coming soon</span></Link>
              </li>
              <li className="nav-item">
                <Link to="/newcredit" className="nav-link" style={isMatch("/newcredit")}>New Credit <span className="right badge badge-danger">New</span></Link>
              </li>
              <li className="nav-item">
                <Link to="/duecredits" className="nav-link" style={isMatch("/duecredits")}>Due Credits <span className="right badge badge-danger">Coming soon</span></Link>
              </li>
              <li className="nav-item">
                <Link to="/duecreditwithitems" className="nav-link" style={isMatch("/duecreditwithitems")}>Due Credits with item <span className="right badge badge-danger">Coming soon</span></Link>
              </li>
              <li className="nav-item">
                <Link to="/pastcredits" className="nav-link" style={isMatch("/pastcredits")}>Past credits <span className="right badge badge-danger">Coming soon</span></Link>
              </li>
              <li className="nav-item">
                <Link to="/pastcreditswithitems" className="nav-link" style={isMatch("/pastcreditswithitems")}>Past credits with items <span className="right badge badge-danger">Coming soon</span></Link>
              </li>
              <li className="nav-item">
                <Link to="/calculator" className="nav-link" style={isMatch("/calculator")}>Calculator <span className="right badge badge-danger">New</span></Link>
              </li>
              <li className="nav-item">
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
