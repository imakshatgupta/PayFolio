const express = require("express");
const cors = require("cors");
const axios = require("axios");
const morgan = require("morgan");
const multer = require("multer");
const dbConnect = require("./config/dbConnect");
const NFT = require("./models/nftModel.js");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(morgan("tiny"));

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type,Accept, x-client-key, x-client-token, x-client-secret, Authorization"
//   );
//   next();
// });

app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
    })
  );

const upload = multer({
    limits: {
      fileSize: 1000000,
    },
  });
  
  const starton = axios.create({
    baseURL: "https://api.starton.io/v3",
    headers: {
      "x-api-key": "sk_live_56267a8f-d888-4b96-95ff-61ae24c2b805",
    },
  });

  app.post("/nftMint", cors(), upload.single("file"), async (req, res) => {
    let data = new FormData();
    const blob = new Blob([req.file.buffer], { type: req.file.mimetype });
    data.append("file", blob, { filename: req.file.originalname });
    data.append("isSync", "true");
    async function uploadImageOnIpfs() {
      const ipfsImg = await starton.post("/ipfs/file", data, {
        headers: {
          "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
        },
      });
      return ipfsImg.data;
    }
    async function uploadMetadataOnIpfs(imgCid) {
      const metadataJson = {
        name: `A Wonderful NFT`,
        description: `Probably the most awesome NFT ever created !`,
        image: `ipfs://ipfs/${imgCid}`,
      };
      const ipfsMetadata = await starton.post("/ipfs/json", {
        name: "My NFT metadata Json",
        content: metadataJson,
        isSync: true,
      });
      return ipfsMetadata.data;
    }
  
    const SMART_CONTRACT_NETWORK = "polygon-amoy";
    const SMART_CONTRACT_ADDRESS = "0x97ACC5387c7537a6B1593CEb194887140c3a1E77";
    const WALLET_IMPORTED_ON_STARTON =
      "0x881cC9dd005c8817ca0b596cF4a894e083A0FE49";
    async function mintNFT(receiverAddress, metadataCid) {
      const nft = await starton.post(
        `/smart-contract/${SMART_CONTRACT_NETWORK}/${SMART_CONTRACT_ADDRESS}/call`,
        {
          functionName: "mint",
          signerWallet: WALLET_IMPORTED_ON_STARTON,
          speed: "low",
          params: [receiverAddress, metadataCid],
        }
      );
      return nft.data;
    }
    const RECEIVER_ADDRESS = "0x9F9546A8920Fe7D3E67d0e2EE8D3b583e064E2FE";
    const ipfsImgData = await uploadImageOnIpfs();
    const ipfsMetadata = await uploadMetadataOnIpfs(ipfsImgData.cid);
    const nft = await mintNFT(RECEIVER_ADDRESS, ipfsMetadata.cid);
    console.log(nft);
    const nftData = new NFT({
      cid: ipfsImgData.cid,
      transaction: nft.transactionHash,
    });
    await nftData.save();
    res.status(201).json({
      transactionHash: nft.transactionHash,
      cid: ipfsImgData.cid,
    });
  });
  

const userRoutes = require("./routes/userRoutes");
const companyRoutes = require("./routes/companyRoutes");
const nftRoutes = require("./routes/nftRoutes");

const PORT = process.env.PORT || 8000;
dbConnect();

app.get("/", async (req, res) => {
  res.redirect("http://localhost:5173/");
});

app.use("/users", userRoutes);
app.use("/company", companyRoutes);
app.use("/nft", nftRoutes);

const server = app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
