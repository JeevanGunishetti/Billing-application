import React, { useState, useEffect, useCallback } from "react";
import Layout from "./Layout";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const BTN_LABEL = "Request password reset link";
const Profile = ({ history }) => {
  const [user, setUser] = useState([]);

  const [nameInputs, setNameInputs] = useState({
    name:"",
    buttonText2: "Submit",
  });

  const [formInputs, setFormInputs] = useState({
    companyName:"",
    buttonText: "Submit",
  });

  const [values, setValues] = useState({
    email: "",
    buttonText3: BTN_LABEL,
  });

  const { buttonText2, name } = nameInputs;
  const { buttonText, companyName } = formInputs;

  const { email, buttonText3 } = values;

  const makeApiCall = useCallback(() => {
    axios
      .get("/profile")
      .then((res) => {
        console.log("FETCH PROFILE SUCCESS!!", res);
        setUser(res.data.user);
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


  const handleChange2 = (evt) => {
    setNameInputs({
      ...nameInputs,
      [evt.target.name] : evt.target.value,
    });
  };

  const handleChange = (evt) => {
    setFormInputs({
      ...formInputs,
      [evt.target.name] : evt.target.value,
    });
  };

  const handleChange3 = (name) => (event) => {
    // console.log(event.target.value);
    setValues({ ...values, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, buttonText3: "Submitting..." });
    axios
      .post("forgot-password", { email })
      .then((response) => {
        console.log("FORGOT PASSWORD SUCCESS", response);
        toast.success(response.data.message);
        setValues({ ...values, buttonText3: BTN_LABEL });
      })
      .catch((error) => {
        console.log("FORGOT PASSWORD ERROR", error.response.data);
        toast.error(error.response.data.error);
        setValues({ ...values, buttonText3: BTN_LABEL });
      });
  };

  // name : (!name.length ? user.name : name),
  // companyName : (!companyName.length  ? user.companyName : companyName ),
  //

  const handleSubmit2 = (evt) => {
    // Avoid page refresh
    // evt.preventDefault();
    setFormInputs({ ...nameInputs, buttonText2: "Submitting..." });

    axios
      .put("/userNameupdate", {
        name,
      })
      .then((res) => {
        console.log("NAME UPDATED SUCCESS!!", res);

        setNameInputs({
          name:"",
          buttonText2: "Submit",
        });

        toast.success(res.data.message);
      })
      .catch((err) => {
        if (err && err.response && err.response.data) {
          toast.error(err.response.data.error);
        }

        setNameInputs({
          ...nameInputs,
          buttonText2: "Submit",
        });
      });
  };


  const handleSubmit = (evt) => {
    // Avoid page refresh
    // evt.preventDefault();
    setFormInputs({ ...formInputs, buttonText: "Submitting..." });

    axios
      .put("/companyNameupdate", {
        companyName,
      })
      .then((res) => {
        console.log("Company name update success!!", res);

        setFormInputs({
          companyName:"",
          buttonText: "Submit",
        });

        toast.success(res.data.message);
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

  // const   name1  = (name.length === 0 ? user.name : name);
  // const companyName1 = (companyName.length === 0 ? user.companyName : companyName );

  return(
  <Layout>
  <ToastContainer/>
  <h2 className="ml-2 mt-2 ">Profile</h2>
  <div className="">
  <div className="form-group ml-3">
    <label className="">Name</label>
    <div className="d-flex flex-inline">
    <input
      onChange={handleChange2}
      name="name"
      value={name}
      type="text"
      className="form-control w-50"
      placeholder = {user.name}
    />

    <button
      type="button"
      className="btn btn-primary ml-3"
      onClick ={handleSubmit2}
    >
      {buttonText}
    </button>
    </div>
  </div>

  <div className="form-group mt-3 ml-3">
    <label className="">Company Name</label>
    <div className="d-flex flex-inline">
    <input
      onChange={handleChange}
      name="companyName"
      value={companyName}
      type="text"
      className="form-control w-50"
      placeholder = {user.companyName}
    />

    <button
      type="button"
      className="btn btn-primary ml-3"
      onClick ={handleSubmit}
    >
      {buttonText}
    </button>
    </div>
  </div>


  <div className="form-group">
    <label className="ml-3">Change the password</label>
    <div className="d-flex flex-inline">
    <input
      onChange={handleChange3("email")}
      value={email}
      type="email"
      className="form-control w-50 ml-3"
      placeholder="Enter email id"
    />

    <button className="btn btn-primary ml-3" onClick={clickSubmit}>
        {buttonText3}
      </button>

  </div>
  </div>

  </div>
  </Layout>
);
};

export default Profile;

// <div className="form-group">
//   <label className="text-muted">Name</label>
//   <input
//     onChange={handleChange}
//     onKeyDown ={handleSubmit}
//     name="name"
//     // value={name}
//     type="text"
//     className="form-control"
//     placeholder = {user.name}
//   />
// </div>
