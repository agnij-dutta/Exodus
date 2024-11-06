import { useState, useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import { WormholeClient } from '../utils/wormhole';
import { ethers } from 'ethers';
import NFTMarketplaceABI from '../abis/NFTMarketplace.json';

export const useNFTMarketplace = () => {
  const { library, account, chainId } = useWeb3React();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const wormhole = new WormholeClient();

  const getContract = () => {
    const address = process.env.NEXT_PUBLIC_MARKETPLACE_ADDRESS;
    return new ethers.Contract(address, NFTMarketplaceABI, library.getSigner());
  };

  const fetchListings = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/listings');
      const data = await response.json();
      setListings(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createListing = async (listingData) => {
    const contract = getContract();
    const tx = await contract.listNFT(
      listingData.tokenAddress,
      listingData.tokenId,
      ethers.utils.parseEther(listingData.price),
      listingData.targetChain
    );
    await tx.wait();
    
    // Update backend
    await fetch('/api/listings/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...listingData,
        seller: account,
        sourceChain: chainId
      })
    });
  };

  const buyNFT = async (listingId, price) => {
    const contract = getContract();
    const tx = await contract.buyNFT(listingId, {
      value: ethers.utils.parseEther(price)
    });
    await tx.wait();
  };

  useEffect(() => {
    fetchListings();
  }, []);

  return {
    listings,
    loading,
    error,
    createListing,
    buyNFT,
    fetchListings
  };
};
