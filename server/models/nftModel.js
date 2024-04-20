const mongoose = require("mongoose");
const nftSchema = new mongoose.Schema({
    cid : {
        type: String,
    },
    transaction : {
        type: String,
    },
    display : {
        type: Boolean,
    },
});
module.exports = new mongoose.model("nft", nftSchema);