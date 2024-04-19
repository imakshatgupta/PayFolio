const Company = require("../models/companyModel.js");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateToken = (user) => {
  const payload = { id: user._id };
  const expiresInDuration = "1d";
  return jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: expiresInDuration,
  });
};

const loginCompany = async (req, res) => {
  const { companyName, password } = req.body;
  const company = await Company.findOne({ companyName });
  if (company && (await company.matchPassword(password))) {
    const token = generateToken(company);
    res.cookie("token", token);
    res.json({
      token,
      company,
    });
  } else {
    res.status(401).json("Invalid Email or Password");
  }
};

const registerCompany = async (req, res) => {
  const { companyName, companyEmail, password } = req.body;
  console.log(req.body);
  const companyExists = await Company.findOne({ $or: [{ companyEmail }, { companyName }] });
  if (companyExists) {
    res.status(404).json({ messsage: "Company Name or Email Already Exist" });
  } else {
    const company = await Company.create({
      companyEmail,
      companyName,
      password,
    });
    if (company) {
      res.status(201).json({
        Success: "Company Registered Successfully!",
      });
    } else {
      res.status(400);
    }
  }
};

const getCompany = async (req, res) => {
  const companyId = req.headers.authorization;
  if (companyId) {
    const company = await Company.findOne({ _id: companyId });
    if (company) {
      return res.status(200).send({ company });
    }
  } else {
    return res.status(401).send({ error: "Company Not Found...!" });
  }
};


module.exports = {
  loginCompany,
  registerCompany,
  getCompany,
};