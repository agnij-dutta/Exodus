const { ethers } = require('ethers');

// Returns provider for a specified chain
const getProviderForChain = (chain) => {
    let rpcUrl;

    switch (chain) {
        case 'ethereum':
            rpcUrl = process.env.ETH_RPC_URL;
            break;
        case 'polygon':
            rpcUrl = process.env.POLYGON_RPC_URL;
            break;
        case 'bsc':
            rpcUrl = process.env.BSC_RPC_URL;
            break;
        case 'avalanche':
            rpcUrl = process.env.AVALANCHE_RPC_URL;
            break;
        default:
            return null; // Unsupported chain
    }

    return new ethers.providers.JsonRpcProvider(rpcUrl);
};

module.exports = { getProviderForChain };
