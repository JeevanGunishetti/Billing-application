import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import Layout from "./Layout";
// import jwt from "jsonwebtoken";

const Dashboard = () => {

  return(
    <Layout>
    <div class="jumbotron">
      <h1 class="display-4">Hello, world!</h1>
      <p class="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
      <hr class="my-4"/>
      <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
      <p class="lead">
        <a class="btn btn-primary btn-lg" href="#" role="button">Learn more</a>
      </p>
    </div>

    <div>
      <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Commodo sed egestas egestas fringilla phasellus faucibus scelerisque. Sed elementum tempus egestas sed. Sit amet mauris commodo quis. Amet tellus cras adipiscing enim eu turpis egestas pretium. Quis imperdiet massa tincidunt nunc pulvinar sapien et ligula ullamcorper. Semper quis lectus nulla at. Venenatis cras sed felis eget velit. Et tortor consequat id porta nibh. Amet nisl suscipit adipiscing bibendum est ultricies integer quis auctor. In ornare quam viverra orci. Sed lectus vestibulum mattis ullamcorper velit sed ullamcorper morbi tincidunt. Eget felis eget nunc lobortis mattis aliquam faucibus. Leo duis ut diam quam. Volutpat ac tincidunt vitae semper quis lectus. Volutpat ac tincidunt vitae semper quis lectus nulla. Tellus pellentesque eu tincidunt tortor aliquam nulla facilisi cras. Congue quisque egestas diam in arcu cursus euismod. Integer eget aliquet nibh praesent tristique magna sit amet purus.
      </p>
      <p>
      Sed id semper risus in hendrerit gravida rutrum quisque non. Semper viverra nam libero justo laoreet sit. Mauris sit amet massa vitae. Laoreet non curabitur gravida arcu ac tortor. Nibh tortor id aliquet lectus proin nibh nisl. Nunc sed velit dignissim sodales. Vitae et leo duis ut. Quam vulputate dignissim suspendisse in est. Vel quam elementum pulvinar etiam non quam. Viverra nam libero justo laoreet sit amet. Mattis molestie a iaculis at erat pellentesque adipiscing. Sodales ut etiam sit amet nisl purus. Nunc mattis enim ut tellus elementum sagittis. Maecenas pharetra convallis posuere morbi. Odio morbi quis commodo odio. Id aliquet lectus proin nibh nisl condimentum id venenatis a. Laoreet suspendisse interdum consectetur libero id faucibus. Quis hendrerit dolor magna eget est lorem ipsum dolor. Vel quam elementum pulvinar etiam non. Et malesuada fames ac turpis.
      </p>
    </div>
    </Layout>
  );
};


export default Dashboard;

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
