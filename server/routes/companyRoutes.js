const express = require ("express");
const {
    loginCompany,
    registerCompany,
    getCompany,
} = require("../controllers/companyController.js");

const router = express.Router();

router.route("/registerCompany").post(registerCompany);
router.route("/loginCompany").post(loginCompany);
router.route("/getCompany").get(getCompany);

module.exports=router;