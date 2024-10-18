const mongoose = require('mongoose');

const NFTSchema = new mongoose.Schema({
    name: String,
    description: String,
    image: String,
    chain: String,
    tokenId: String,
    owner: String,
    wrapped: { type: Boolean, default: false },
});

module.exports = mongoose.model('NFT', NFTSchema);
