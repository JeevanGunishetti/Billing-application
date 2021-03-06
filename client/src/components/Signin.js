import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { authenticate, isAuth } from "../utils/helpers";
import Layout from "./Layout";

const Signin = ({ history }) => {
  const [formInputs, setFormInputs] = useState({
    email: "",
    password: "",
    buttonText: "Submit",
  });
  const { buttonText, email, password } = formInputs;

  const handleChange = (evt) => {
    setFormInputs({
      ...formInputs,
      [evt.target.name]: evt.target.value,
    });
  };

  const handleSubmit = (evt) => {
    // Avoid page refresh
    evt.preventDefault();
    setFormInputs({ ...formInputs, buttonText: "Submitting..." });

    axios
      .post("/signin", {
        email,
        password,
      })
      .then((res) => {
        console.log("SIGNED UP SUCCESS!!", res);

        authenticate(res, () => {
          setFormInputs({
            ...formInputs,
            name: "",
            email: "",
            password: "",
            buttonText: "Submitted",
          });
          // toast.success(`Hey ${response.data.user.name}, Welcome back!`);
          isAuth() ? history.push("/") : history.push("/signin");
        });
      })
      .catch((err) => {
        if (err && err.response && err.response.data) {
          toast.error(err.response.data.error);
        }

        setFormInputs({
          ...formInputs,
          buttonText: "Submit",
        });
      });
  };

  const signinForm = () => (
    <form>
      <div className="form-group">
        <label className="text-muted">Email</label>
        <input
          onChange={handleChange}
          name="email"
          type="email"
          value={email}
          className="form-control"
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Password</label>
        <input
          onChange={handleChange}
          name="password"
          type="password"
          value={password}
          className="form-control"
        />
      </div>

      <div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleSubmit}
        >
          {buttonText}
        </button>
      </div>
    </form>
  );

  return (
    <Layout>
      <div className="col-md-6 offset-md-3">
        <ToastContainer />
        <h1 className="p-5 text-center">Sign in</h1>
        {signinForm()}
        <br />
        <Link
          to="/auth/password/forgot"
          className="btn btn-sm btn-outline-danger"
        >
          Forgot Password
        </Link>

        <br />
        <div className="d-flex align-items-center">
        <p className="mt-3">Still you haven't signed up</p>
        <Link
          to="/signup"
          className="btn btn-sm btn-outline-danger ml-3 p-2"
        >
          Signup
        </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Signin;
