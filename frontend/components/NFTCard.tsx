import React from 'react';
import Image from 'next/image';

interface NFTCardProps {
  id: string;
  name: string;
  image: string;
  price: string;
  chain: string;
  onBuy: () => void;
}

export const NFTCard: React.FC<NFTCardProps> = ({
  id,
  name,
  image,
  price,
  chain,
  onBuy
}) => {
  return (
    <div className="border rounded-lg p-4 shadow-md">
      <Image
        src={image}
        alt={name}
        width={200}
        height={200}
        className="rounded-lg"
      />
      <h3 className="text-lg font-bold mt-2">{name}</h3>
      <p className="text-gray-600">{chain}</p>
      <p className="text-xl font-bold mt-2">{price}</p>
      <button
        onClick={onBuy}
        className="w-full bg-blue-500 text-white py-2 rounded-lg mt-4 hover:bg-blue-600"
      >
        Buy Now
      </button>
    </div>
  );
};
