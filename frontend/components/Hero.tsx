import React from 'react';
import Link from 'next/link';

export const Hero: React.FC = () => {
  return (
    <div className="bg-black text-white py-24 px-6 md:px-12 flex flex-col items-center justify-center">
      <h1 className="text-4xl md:text-6xl font-bold mb-4">
        Seamless Cross-Chain NFT Marketplace
      </h1>
      <p className="text-lg md:text-xl mb-8">
        Buy, sell, and transfer NFTs across multiple blockchains.
      </p>
      <div className="space-x-4">
        <Link href="/marketplace">
          <a className="bg-purple-500 text-white px-6 py-3 rounded-md hover:bg-purple-600">
            Explore Marketplace
          </a>
        </Link>
        <Link href="/dashboard">
          <a className="text-purple-500 hover:text-purple-600">
            View Dashboard
          </a>
        </Link>
      </div>
    </div>
  );
};
