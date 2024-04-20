const hre = require('hardhat');

const main = async () => {
    const transactionsFactory = await hre.ethers.getContractFactory("Transactions");
    const transactionsContract = await transactionsFactory.deploy();
  
    await transactionsContract.deployed();
  
    console.log("Transactions address: ", transactionsContract.address);
  };
  
  const runMain = async () => {
    try {
      await main();
      process.exit(0);
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  };
  
  runMain();

  // 0x5FbDB2315678afecb367f032d93F642f64180aa3