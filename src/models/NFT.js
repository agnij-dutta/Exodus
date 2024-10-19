const mongoose = require('mongoose');

const NFTSchema = new mongoose.Schema({
    tokenId: { type: String, required: true },
    chain: { type: String, required: true },
    owner: { type: String, required: true },
    tokenURI: { type: String, required: true },
    metadata: { type: Object }, // Optional: Store metadata details directly
    premium: { type: Boolean, default: false },
}, { timestamps: true });

const NFTModel = mongoose.model('NFT', NFTSchema);
module.exports = NFTModel;
