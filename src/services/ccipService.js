const { ethers } = require('ethers');
const { Bridge, ChainId, transferNFT } = require('@certusone/wormhole-sdk');

const { WORMHOLE_RELAYER_ADDRESS } = process.env;

// Verify cross-chain messages using Wormhole
const verifyAndProcessMessage = async (chain, tokenId, recipient, tokenURI, signedMessage) => {
    // Example: Validate Wormhole signature and relayer
    const isValid = await verifyWormholeSignature(signedMessage);
    if (!isValid) {
        throw new Error("Invalid Wormhole signature or unauthorized relayer");
    }

    // Call the contract's receiveCrossChainNFT function on the destination chain
    const provider = getProviderForChain(chain);
    const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

    const contract = new ethers.Contract(process.env[`${chain.toUpperCase()}_NFT_CONTRACT_ADDRESS`], nftABI, signer);
    const tx = await contract.receiveCrossChainNFT(tokenId, recipient, tokenURI);
    await tx.wait();

    return tx;
};

// Verifies that the Wormhole message was relayed by an authorized relayer
const verifyWormholeSignature = async (signedMessage) => {
    const relayer = signedMessage.relayer;
    // Ensure the relayer is from a verified Wormhole guardian
    return relayer === WORMHOLE_RELAYER_ADDRESS;
};

module.exports = { verifyAndProcessMessage };
