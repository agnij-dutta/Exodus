const hre = require("hardhat");

async function main() {
    const CrossChainNFT = await hre.ethers.getContractFactory("CrossChainNFT");
    const nft = await CrossChainNFT.deploy();

    await nft.deployed();
    console.log("CrossChainNFT deployed to:", nft.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
