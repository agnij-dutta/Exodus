import React from 'react';
import Link from 'next/link';

export const CallToAction: React.FC = () => {
  return (
    <div className="bg-purple-500 text-white py-12 px-6 md:px-12 flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-4">Join the EXODUS Revolution</h2>
      <p className="mb-8 text-lg">
        Discover the future of cross-chain NFT trading and investment.
      </p>
      <div className="space-x-4">
        <Link href="/marketplace">
          <a className="bg-white text-purple-500 px-6 py-3 rounded-md hover:bg-purple-600 hover:text-white">
            Explore Marketplace
          </a>
        </Link>
        <Link href="/dashboard">
          <a className="text-white hover:text-black">View Dashboard</a>
        </Link>
      </div>
    </div>
  );
};