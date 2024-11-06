import React from 'react';
import { NFTCard } from './NFTCard';

interface NFTGridProps {
  listings: any[];
}

export const NFTGrid: React.FC<NFTGridProps> = ({ listings }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {listings.map((listing) => (
        <NFTCard
          key={listing.id}
          {...listing}
        />
      ))}
    </div>
  );
};