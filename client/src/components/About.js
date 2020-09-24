import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import Layout from "./Layout";
// import jwt from "jsonwebtoken";

const About = () => {

  return(
    <Layout>
    <div className="d-flex flex-column justify-content-center ml-3">
    <div class="jumbotron">
      <h1 class="display-4">About us</h1>
      <p class="lead">Billing application is used for billing the bills and store the bills without hazzle for the security. </p>
      <hr class="my-4"/>
      <p>This application can also used as Khata book.</p>
    </div>

    <div>
      <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Commodo sed egestas egestas fringilla phasellus faucibus scelerisque. Sed elementum tempus egestas sed. Sit amet mauris commodo quis. Amet tellus cras adipiscing enim eu turpis egestas pretium. Quis imperdiet massa tincidunt nunc pulvinar sapien et ligula ullamcorper. Semper quis lectus nulla at. Venenatis cras sed felis eget velit. Et tortor consequat id porta nibh. Amet nisl suscipit adipiscing bibendum est ultricies integer quis auctor. In ornare quam viverra orci. Sed lectus vestibulum mattis ullamcorper velit sed ullamcorper morbi tincidunt. Eget felis eget nunc lobortis mattis aliquam faucibus. Leo duis ut diam quam. Volutpat ac tincidunt vitae semper quis lectus. Volutpat ac tincidunt vitae semper quis lectus nulla. Tellus pellentesque eu tincidunt tortor aliquam nulla facilisi cras. Congue quisque egestas diam in arcu cursus euismod. Integer eget aliquet nibh praesent tristique magna sit amet purus.
      </p>

    </div>

    <div className="font-weight-bold mt-3 ml-3">
    <p >contact details</p>
    <p>email: enquiry@billing.com </p>
    <p>phone no: (+91)9278937391</p>
    <p>Head Quarters: 7-21, near moosapet junction, moosapet, Hyderabad, 505022.</p>
    </div>
    </div>
    </Layout>
  );
};


export default About;

// const [users, setUsers] = useState([]);
// const [fileUpload, setFileUpload] = useState();
//
// // const jwt = localStorage.getItem(token);
// // const _id = jwt.decode(jwt);
// // console.log(_id);
//
// const makeApiCall = useCallback(() => {
//   axios
//     .get("chart")
//     .then((res) => {
//       console.log("FETCH USERS SUCCESS!!", res);
//
//       setUsers(res.data.bills);
//     })
//     .catch((err) => {
//       if (err && err.response && err.response.data) {
//         toast.error(err.response.data.error);
//       }
//     });
// }, []);
//
// const onChangeHandler = useCallback((event) => {
//   setFileUpload(event.target.files[0]);
// }, []);
//
// const uploadImage = useCallback(() => {
//   const data = new FormData();
//   data.append("myImage", fileUpload);
//   const config = {
//     headers: {
//       "content-type": "multipart/form-data",
//     },
//   };
//
//   axios
//     .post("file/image-upload", data, config)
//     .then((res) => {
//       console.log("IMAGE UPLOAD SUCCESS!!", res);
//     })
//     .catch((err) => {
//       if (err && err.response && err.response.data) {
//         toast.error(err.response.data.error);
//       }
//     });
// }, [fileUpload]);
//
// useEffect(() => {
//   makeApiCall();
// }, [makeApiCall]);
//
// // <ul>
// //   {!users.length ? (
// //     <li>No users have signedup.</li>
// //   ) : (
// //     users.map((user) => <li key={user._id}>{user.name}</li>)
// //   )}
// // </ul>
//
// return (
//   <Layout>
//     <div className="col-md-6 offset-md-3">
//       <ToastContainer />
//
//
//
//       <button className="btn btn-primary" onClick={makeApiCall}>
//         Make API Call
//       </button>
//
//       <form>
//         <input type="file" name="file" onChange={onChangeHandler} />
//         <button type="button" className="btn btn-primary" onClick={uploadImage}>
//           Upload
//         </button>
//       </form>
//     </div>
//   </Layout>
// );
// };
