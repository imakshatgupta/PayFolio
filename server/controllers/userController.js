const User = require("../models/userModel.js");
const NFT = require("../models/nftModel.js");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateToken = (user) => {
  const payload = { id: user._id };
  const expiresInDuration = "1d";
  return jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: expiresInDuration,
  });
};

const loginUser = async (req, res) => {
  const { userName, password } = req.body;
  const user = await User.findOne({ userName });
  if (user && (await user.matchPassword(password))) {
    const token = generateToken(user);
    res.cookie("token", token);
    res.json({
      token,
      user,
    });
  } else {
    res.status(401).json("Invalid Email or Password");
  }
};

const registerUser = async (req, res) => {
  const { userName, fullName, email, password } = req.body;
  const userExists = await User.findOne({ $or: [{ email }, { userName }] });
  if (userExists) {
    res.status(404).json({ messsage: "Username or Email Already Exist" });
  } else {
    const user = await User.create({
      userName,
      fullName,
      email,
      password,
    });
    if (user) {
      res.status(201).json({
        Success: "User Registered Successfully!",
      });
    } else {
      res.status(400);
    }
  }
};

const getUser = async (req, res) => {
  const userId = req.headers.authorization;
  if (userId) {
    const user = await User.findOne({ _id: userId });
    if (user) {
      return res.status(200).send({ user });
    }
  } else {
    return res.status(401).send({ error: "User Not Found...!" });
  }
};

const getSalarySlip = async (req, res) => {
  try {
    const nfts = await NFT.find({ display: true });
    res.status(200).json(nfts);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const displaySalarySlip = async (req, res) => {
  try {
    const nft = await NFT.findOne({ display: false });
    if (!nft) {
      return res.status(404).json({ error: "All latest Slips are generated" });
    }
    nft.display = true;
    await nft.save();
    res.status(200).json(nft);
  } catch (error) {
    console.error("Error displaying salary slip:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};




module.exports = {
  loginUser,
  registerUser,
  getUser,
  getSalarySlip,
  displaySalarySlip,
};
