require('@nomiclabs/hardhat-waffle');
require('dotenv').config();

console.log("Rinkeby URL:", process.env.RINKEBY_URL);
console.log("Private Key Loaded:", process.env.PRIVATE_KEY ? "Yes" : "No");

module.exports = {
    solidity: "0.8.0",
    networks: {
        rinkeby: {
            url: process.env.RINKEBY_URL,
            accounts: [process.env.PRIVATE_KEY]
        }
    }
};
