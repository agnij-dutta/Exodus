import React from 'react';
import { Header } from '../components/Header';
import { NFTGrid } from '../components/NFTGrid';
import { Footer } from '../components/Footer';
import { useNFTMarketplace } from '../hooks/useNFTMarketplace';

const MarketplacePage = () => {
  const { listings, loading, error } = useNFTMarketplace();

  return (
    <div className="bg-white text-gray-900 font-inter">
      <Header />
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8">Marketplace</h1>
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div>Error: {error}</div>
          ) : (
            <NFTGrid listings={listings} />
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default MarketplacePage;