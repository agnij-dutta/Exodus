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

    try {
        // Fetch all NFTs from MongoDB that are owned by the specified owner
        const nfts = await NFTModel.find({ owner });

        if (nfts.length === 0) {
            return res.json({ success: true, message: 'No NFTs found for this user' });
        }

        return res.json({ success: true, nfts });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

const burnNFT = async (req, res) => {
    const { chain, tokenId } = req.body;

    try {
        // Get the provider for the chain
        const provider = getProviderForChain(chain);
        const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

        // Connect to the NFT contract
        const contract = new ethers.Contract(process.env[`${chain.toUpperCase()}_NFT_CONTRACT_ADDRESS`], nftABI, signer);

        // Burn the NFT on the blockchain
        const tx = await contract.burn(tokenId);
        await tx.wait();

        // Remove from MongoDB
        await NFTModel.deleteOne({ chain, tokenId });

        return res.json({ success: true, message: `NFT with ID ${tokenId} has been burned and removed from database.` });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
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
