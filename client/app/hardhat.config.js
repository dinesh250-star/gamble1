require("@nomiclabs/hardhat-waffle");
require("dotenv").config();
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");
// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});
//c
// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
const api = process.env.POLYGONSCAN_API_KEY || "";
const pvt = process.env.PRIVATE_KEY || "";
module.exports = {
  // solidity: "0.8.4",
  paths: {
    artifacts: "./src/artifacts",
  },
  defaultNetwork: "matic",
  networks: {
    hardhat: {},
    matic: {
      url: "https://rpc-mumbai.maticvigil.com",
      accounts: [
        "05a8283540718fd326d7b49ed4011f7324e97519ae0bb3fcf9097e089ecda34f",
      ],
    },
  },
  etherscan: {
    apiKey: "9NZ74TYKQUWIT7KUB1814H1EERTY7VU7MI",
  },
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
