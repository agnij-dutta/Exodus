const { ethers } = require('ethers');
const { Connection, Keypair, PublicKey, Transaction, SystemProgram, sendAndConfirmTransaction } = require('@solana/web3.js');
const { Program, AnchorProvider } = require('@project-serum/anchor');
const { SPL_TOKEN_PROGRAM_ID, Token } = require('@solana/spl-token');
const NFT_ABI = require('../abi/NFT.json'); // Ensure you have the ABI of the NFT contract

// Minting on Ethereum
const mintOnEthereum = async (metadata) => {
    const provider = new ethers.providers.JsonRpcProvider(process.env.ETH_RPC_URL);
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
    const nftContract = new ethers.Contract(process.env.ETH_NFT_CONTRACT_ADDRESS, NFT_ABI, wallet);
    
    const tx = await nftContract.mintNFT(wallet.address, metadata);
    await tx.wait(); // Wait for transaction confirmation
    return tx.hash;
};

// Minting on Polygon
const mintOnPolygon = async (metadata) => {
    const provider = new ethers.providers.JsonRpcProvider(process.env.POLYGON_RPC_URL);
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
    const nftContract = new ethers.Contract(process.env.POLYGON_NFT_CONTRACT_ADDRESS, NFT_ABI, wallet);
    
    const tx = await nftContract.mintNFT(wallet.address, metadata);
    await tx.wait();
    return tx.hash;
};

// Minting on BSC
const mintOnBSC = async (metadata) => {
    const provider = new ethers.providers.JsonRpcProvider(process.env.BSC_RPC_URL);
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
    const nftContract = new ethers.Contract(process.env.BSC_NFT_CONTRACT_ADDRESS, NFT_ABI, wallet);
    
    const tx = await nftContract.mintNFT(wallet.address, metadata);
    await tx.wait();
    return tx.hash;
};

// Minting on Avalanche
const mintOnAvalanche = async (metadata) => {
    const provider = new ethers.providers.JsonRpcProvider(process.env.AVALANCHE_RPC_URL);
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
    const nftContract = new ethers.Contract(process.env.AVALANCHE_NFT_CONTRACT_ADDRESS, NFT_ABI, wallet);
    
    const tx = await nftContract.mintNFT(wallet.address, metadata);
    await tx.wait();
    return tx.hash;
};

// Minting on Solana
const mintOnSolana = async (metadata) => {
    const connection = new Connection(process.env.SOL_RPC_URL, 'confirmed');
    const wallet = Keypair.fromSecretKey(Uint8Array.from(JSON.parse(process.env.SOL_PRIVATE_KEY)));

    const programId = new PublicKey(process.env.SOL_PROGRAM_ID);
    const provider = new AnchorProvider(connection, wallet, { preflightCommitment: 'processed' });
    const program = new Program(programId, provider);
    
    const tx = await program.rpc.mintNft(metadata, {
        accounts: {
            mint: new PublicKey(wallet.publicKey),
            user: wallet.publicKey,
            systemProgram: SystemProgram.programId,
        },
    });

    return tx;
};

module.exports = {
    mintOnEthereum,
    mintOnPolygon,
    mintOnBSC,
    mintOnAvalanche,
    mintOnSolana,
};
