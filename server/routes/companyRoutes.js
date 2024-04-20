const express = require ("express");
const {
    loginCompany,
    registerCompany,
    getCompany,
    addEmployer,
} = require("../controllers/companyController.js");

const router = express.Router();

router.route("/registerCompany").post(registerCompany);
router.route("/loginCompany").post(loginCompany);
router.route("/getCompany").get(getCompany);
router.route("/addEmployer").post(addEmployer);

module.exports=router;