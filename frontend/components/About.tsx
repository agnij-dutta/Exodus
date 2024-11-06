import React from 'react';

export const About: React.FC = () => {
  return (
    <div className="bg-black text-white py-12 px-6 md:px-12">
      <h2 className="text-3xl font-bold mb-8 text-center">About Us</h2>
      <div className="max-w-3xl mx-auto">
        <p className="mb-4">
          EXODUS is a groundbreaking cross-chain NFT marketplace that empowers
          users to seamlessly buy, sell, and transfer non-fungible tokens across
          multiple blockchains.
        </p>
        <p className="mb-4">
          Our mission is to bridge the gap between fragmented NFT ecosystems,
          providing a unified and secure platform for the future of digital
          ownership.
        </p>
        <p>
          With EXODUS, you can access a thriving marketplace of unique digital
          assets, explore new creative horizons, and take control of your
          digital investments.
        </p>
      </div>
    </div>
  );
};