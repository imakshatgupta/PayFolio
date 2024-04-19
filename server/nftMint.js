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
  