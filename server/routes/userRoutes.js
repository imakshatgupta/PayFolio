const express = require ("express");
const {
  loginUser,
  registerUser,
  getUser,
  getSalarySlip,
  displaySalarySlip,
} = require("../controllers/userController.js");

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/getUser").get(getUser);
router.route("/getSalarySlip").get(getSalarySlip);
router.route("/displaySalarySlip").post(displaySalarySlip);

module.exports=router;