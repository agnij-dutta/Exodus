require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const { mintNFT, fetchNFT, listNFTs, burnNFT } = require('./controllers/nftController');

const app = express();
app.use(express.json());
connectDB();

// API Endpoints
app.post('/api/nft/mint', mintNFT);
app.get('/api/nft/:chain/:tokenId', fetchNFT);
app.get('/api/nft/list', listNFTs);
app.post('/api/nft/burn', burnNFT);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
