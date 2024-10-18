# Exodus: Cross-Chain NFT Platform

## Overview

Exodus is a cutting-edge Cross-Chain NFT Platform that enables users to mint, transfer, and trade NFTs seamlessly across multiple blockchain ecosystems. Built using the Wormhole protocol, Exodus facilitates true interoperability among Ethereum, Solana, Polygon, Binance Smart Chain, and Avalanche, breaking down barriers in the NFT space.

## Key Features

- **Multi-Chain Support**: Mint and transfer NFTs across Ethereum, Solana, Polygon, Binance Smart Chain, and Avalanche.
- **User-Friendly API**: Provides a robust API for developers to easily integrate cross-chain NFT functionality into their applications.
- **NFT Minting**: Create unique NFTs on your preferred blockchain with customizable metadata.
- **Cross-Chain Transfers**: Effortlessly transfer NFTs between different blockchains, maintaining security and integrity.
- **NFT Metadata Retrieval**: Fetch metadata for NFTs using token IDs across different chains.
- **NFT Listing and Burning**: List NFTs owned by users and burn NFTs if desired.

## Technologies Used

- **Ethereum**, **Solana**, **Polygon**, **Binance Smart Chain**, **Avalanche**
- **Wormhole Protocol** for cross-chain transfers
- **MongoDB** for storing NFT metadata and user information
- **Express.js** for the backend API
- **Hardhat** for Ethereum smart contract development

## Installation

### Prerequisites

- Node.js
- MongoDB
- Solana CLI and Anchor (for Solana development)

### Setup Instructions

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/exodus.git
   cd exodus```
2. **Install the required dependencies**:
   ```bash
   npm install```
3. **Configure the environment variables in .env**:
   ```dotenv
   MONGO_URI=mongodb://localhost:27017/exodus
   ETH_RPC_URL=https://rinkeby.infura.io/v3/YOUR_INFURA_PROJECT_ID
   PRIVATE_KEY=YOUR_ETH_PRIVATE_KEY
   ETH_NFT_CONTRACT_ADDRESS=YOUR_ETH_CONTRACT_ADDRESS
   SOL_RPC_URL=https://api.devnet.solana.com
   SOL_PRIVATE_KEY=YOUR_SOLANA_PRIVATE_KEY_JSON
   SOL_PROGRAM_ID=YOUR_SOLANA_PROGRAM_ID
   POLYGON_RPC_URL=https://polygon-rpc.com
   BSC_RPC_URL=https://bsc-dataseed.binance.org/
   AVALANCHE_RPC_URL=https://api.avax.network/ext/bc/C/rpc```
4. **Compile and deploy the smart contracts for each blockchain:**
   ```bash
   cd ethereum
   npx hardhat compile
   npx hardhat run scripts/deploy.js --network rinkeby
   # Repeat for Polygon, BSC, and Avalanche```
5. **Start the backend server**:
   ```bash
   npm run start```

## Usage
You can interact with the API using tools like Postman or CURL. Here are the available endpoints:

### API Endpoints
- Mint NFT: ```POST /api/nft/mint```
  - Request Body: ```{ "chain": "ethereum", "metadata": { "name": "My NFT", "description": "An amazing NFT", "image": "link_to_image" } }```

- Fetch NFT Metadata: ```GET /api/nft/:chain/:tokenId```

- List User NFTs: ```GET /api/nft/list?owner=USER_ADDRESS```

- Burn NFT: ```POST /api/nft/burn```
  - Request Body: { "tokenId": "1" }
 
