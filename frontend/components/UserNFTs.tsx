import React from 'react';
import { NFTCard } from './NFTCard';

export const UserNFTs: React.FC = () => {
  // Fetch user's NFTs and render them
  const userNFTs = [
    // Sample data
    {
      id: '1',
      name: 'NFT 1',
      image: '/placeholder.png',
      price: '1.5 ETH',
      chain: 'Ethereum'
    },
    {
      id: '2',
      name: 'NFT 2',
      image: '/placeholder.png',
      price: '2.3 SOL',
      chain: 'Solana'
    },
    {
      id: '3',
      name: 'NFT 3',
      image: '/placeholder.png',
      price: '0.8 AVAX',
      chain: 'Avalanche'
    }
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold mb-4">Your NFTs</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {userNFTs.map((nft) => (
          <NFTCard key={nft.id} {...nft} />
        ))}
      </div>
    </div>
  );
};