const express = require("express");
const { nftMint } = require("../controllers/nftController.js");

const router = express.Router();

router.route("/nftMint").patch(nftMint);

module.exports = router;