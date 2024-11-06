import React, { useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { useNFTMarketplace } from '../hooks/useNFTMarketplace';

export const ListingForm: React.FC = () => {
  const { account } = useWeb3React();
  const { createListing } = useNFTMarketplace();
  const [formData, setFormData] = useState({
    tokenAddress: '',
    tokenId: '',
    price: '',
    targetChain: 'ethereum'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createListing(formData);
      // Reset form or show success message
    } catch (error) {
      console.error('Error creating listing:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label>Token Address</label>
        <input
          type="text"
          value={formData.tokenAddress}
          onChange={(e) => setFormData({ ...formData, tokenAddress: e.target.value })}
          className="w-full p-2 border rounded"
        />
      </div>
      {/* Add other form fields */}
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Create Listing
      </button>
    </form>
  );
};