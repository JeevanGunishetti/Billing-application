const express = require("express");
const router = express.Router();
const { billing,advanceorders, newcredit, pastcreditswithitems, duecredits, duecreditwithitems, pastcredits,
   billdetails, chart, duecreditupdate, notifications, notificationscount} = require("../controllers/billing");

// console.log("helo");

router.post("/billing", billing );
router.get("/advanceorders", advanceorders );
router.post("/newcredit", newcredit);
router.get("/duecredits", duecredits);
router.get("/duecreditwithitems", duecreditwithitems );
router.get("/pastcredits", pastcredits);
router.get("/pastcreditswithitems", pastcreditswithitems);
router.get("/notifications", notifications);
router.get("/count", notificationscount);
router.get("/bill/:id", billdetails);
router.get("/chart", chart);
router.put("/updatebill/:id", duecreditupdate);


module.exports = router;
