require("@nomicfoundation/hardhat-toolbox");


module.exports = {
  solidity: "0.8.0",
  networks: {
    polygon: {
      url: "https://polygon-amoy.g.alchemy.com/v2/AXkabv0e4aPivkA4fYNjCcRrLjskencd",
      accounts: [
        "8a9dc1a6ba4f6b2de9d8f7b3864b7e4a15b3c9628eb3b45a0f273ca4f4519e3c",
      ],
    },
  },
};
