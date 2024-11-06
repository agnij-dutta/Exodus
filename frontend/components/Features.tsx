import React from 'react';

export const Features: React.FC = () => {
  return (
    <div className="bg-white text-black py-12 px-6 md:px-12">
      <h2 className="text-3xl font-bold mb-8 text-center">Key Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-purple-50 p-6 rounded-md">
          <h3 className="text-2xl font-bold mb-4">Cross-Chain Transfers</h3>
          <p>
            Seamlessly transfer your NFTs between Ethereum, Solana, and Avalanche
            blockchains.
          </p>
        </div>
        <div className="bg-purple-50 p-6 rounded-md">
          <h3 className="text-2xl font-bold mb-4">Unified Marketplace</h3>
          <p>
            Browse and purchase NFTs from multiple chains in a single, intuitive
            interface.
          </p>
        </div>
        <div className="bg-purple-50 p-6 rounded-md">
          <h3 className="text-2xl font-bold mb-4">Secure Transactions</h3>
          <p>
            Enjoy the peace of mind of secure, blockchain-based NFT trading with
            our platform.
          </p>
        </div>
      </div>
    </div>
  );
};