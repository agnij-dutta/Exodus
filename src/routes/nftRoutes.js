// Promote an NFT to premium
const promoteToPremium = async (req, res) => {
    const { tokenId, chain } = req.body;
    const premiumFee = 0.05; // Example premium listing fee

    try {
        // Find the NFT in the database
        const nft = await NFTModel.findOne({ tokenId, chain });
        if (!nft) {
            return res.status(404).json({ success: false, error: 'NFT not found' });
        }

        // Mark as premium
        nft.premium = true;
        await nft.save();

        return res.json({ success: true, message: `NFT ${tokenId} is now a premium listing.` });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// List all premium NFTs
const listPremiumNFTs = async (req, res) => {
    try {
        const nfts = await NFTModel.find({ premium: true });
        return res.json({ success: true, nfts });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};
