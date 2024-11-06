import React from 'react';
import { NFTGrid } from './NFTGrid';
import { useNFTMarketplace } from '../hooks/useNFTMarketplace';

export const MarketplaceSection = () => {
  const { listings, loading, error } = useNFTMarketplace();

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Marketplace</h2>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error: {error}</div>
        ) : (
          <NFTGrid listings={listings} />
        )}
      </div>
    </section>
  );
};