import React, { useState, useEffect, useCallback } from "react";
import Layout from "./Layout";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const DueCredits=()=>{
  return(
  <Layout>
  <h1>Due Credits Component</h1>
  </Layout>
);
};

// const DueCredits=()=>{
//   const [bills,setBills] = useState([]);
//
//   const makeApiCall = useCallback(() => {
//     axios
//       .get("/duecredits")
//       .then((res) => {
//         console.log("FETCH BILLS SUCCESS!!", res);
//
//         setBills(res.data.result);
//       })
//       .catch((err) => {
//         if (err && err.response && err.response.data) {
//           toast.error(err.response.data.error);
//         }
//       });
//   }, []);
//
//   useEffect(() => {
//     makeApiCall();
//   }, [makeApiCall]);
//
//   return(
//   <Layout>
//   <h1>Due Credits Component</h1>
//   {!bills.length ? (
//     <h3>No Due Credits.</h3>
//   ) : (
//     <div>
//       <table border="1">
//         <tbody>
//           {bills.map(([_id,customer_name, due_amount, customer_address, customer_phone]) => (
//             <tr key={_id}>
//               <td>{customer_name}</td>
//               <td>{due_amount}</td>
//               <td>{customer_address}</td>
//               <td>{customer_phone}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   )}
//   </Layout>
// );
// };

export default DueCredits;
