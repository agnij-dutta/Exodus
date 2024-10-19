const { mintOnEthereum, mintOnSolana, mintOnPolygon, mintOnBSC, mintOnAvalanche } = require('../services/blockchainService');
const NFT = require('../models/NFT');
const { transferNFTToChain } = require('../services/blockchainService');

const mintNFT = async (req, res) => {
    const { chain, metadata } = req.body;

    try {
        let txHash;
        if (chain === 'ethereum') {
            txHash = await mintOnEthereum(metadata);
        } else if (chain === 'solana') {
            txHash = await mintOnSolana(metadata);
        } else if (chain === 'polygon') {
            txHash = await mintOnPolygon(metadata);
        } else if (chain === 'bsc') {
            txHash = await mintOnBSC(metadata);
        } else if (chain === 'avalanche') {
            txHash = await mintOnAvalanche(metadata);
        }
        return res.json({ success: true, txHash });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// Additional methods for fetching and burning NFTs
const fetchNFT = async (req, res) => {
    const { chain, tokenId } = req.params;

    try {
        // First, check if the NFT is stored in MongoDB
        const nft = await NFTModel.findOne({ chain, tokenId });
        if (nft) {
            return res.json({ success: true, nft });
        }

        // If not in MongoDB, fetch from the blockchain
        const provider = getProviderForChain(chain);
        if (!provider) {
            return res.status(400).json({ success: false, error: 'Unsupported chain' });
        }

        // Interact with the blockchain to get token URI
        const contract = new ethers.Contract(process.env[`${chain.toUpperCase()}_NFT_CONTRACT_ADDRESS`], nftABI, provider);
        const tokenURI = await contract.tokenURI(tokenId);

        return res.json({ success: true, tokenId, tokenURI });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

const listNFTs = async (req, res) => {
    const { owner } = req.query;
    // List NFTs owned by the user from MongoDB
};

const burnNFT = async (req, res) => {
    const { tokenId } = req.body;
    // Burn the NFT on the corresponding blockchain
};



const transferNFT = async (req, res) => {
    const { chain, tokenId, destinationChain, recipient } = req.body;

    try {
        const receipt = await transferNFTToChain(chain, tokenId, destinationChain, recipient);
        return res.json({ success: true, receipt });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};


module.exports = { mintNFT, fetchNFT, listNFTs, burnNFT };
