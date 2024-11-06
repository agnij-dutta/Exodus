import { ethers } from 'hardhat';
import { writeFileSync } from 'fs';

async function main() {
    // Deploy NFT Marketplace
    const NFTMarketplace = await ethers.getContractFactory('NFTMarketplace');
    const marketplace = await NFTMarketplace.deploy();
    await marketplace.deployed();
    console.log('NFTMarketplace deployed to:', marketplace.address);

    // Deploy NFT Bridge
    const NFTBridge = await ethers.getContractFactory('NFTBridge');
    const bridge = await NFTBridge.deploy(process.env.WORMHOLE_BRIDGE_ADDRESS);
    await bridge.deployed();
    console.log('NFTBridge deployed to:', bridge.address);

    // Save deployment addresses
    const addresses = {
        marketplace: marketplace.address,
        bridge: bridge.address,
        network: network.name
    };

    writeFileSync(
        `deployments/${network.name}.json`,
        JSON.stringify(addresses, null, 2)
    );
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });