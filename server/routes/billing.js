const express = require("express");
const router = express.Router();
const { billing,advanceorders, newcredit, pastcreditswithitems, duecredits, duecreditwithitems, pastcredits } = require("../controllers/billing");
const { authorize } = require("../middlewares/auth");

// console.log("helo");

router.post("/billing", billing );
router.get("/advanceorders", advanceorders );
router.post("/newcredit", newcredit);
router.get("/duecredits", duecredits);
router.get("/duecreditwithitems", duecreditwithitems );
router.get("/pastcredits", pastcredits);
router.get("/pastcreditswithitems", pastcreditswithitems);

module.exports = router;
