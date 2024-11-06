import React from 'react';
import { TransferProgress } from './TransferProgress';

export const TransferHistory: React.FC = () => {
  // Fetch user's transfer history and render it
  const transfers = [
    // Sample data
    {
      id: '1',
      fromChain: 'Ethereum',
      toChain: 'Solana',
      tokenId: '123',
      status: 'Completed'
    },
    {
      id: '2',
      fromChain: 'Solana',
      toChain: 'Avalanche',
      tokenId: '456',
      status: 'Pending'
    },
    {
      id: '3',
      fromChain: 'Avalanche',
      toChain: 'Ethereum',
      tokenId: '789',
      status: 'Confirmed'
    }
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold mb-4">Transfer History</h2>
      {transfers.map((transfer) => (
        <div key={transfer.id} className="bg-purple-50 p-4 rounded-md mb-4">
          <p className="text-lg font-medium">
            {transfer.fromChain} → {transfer.toChain}
          </p>
          <p className="text-gray-600">Token ID: {transfer.tokenId}</p>
          <TransferProgress transferId={transfer.id} />
        </div>
      ))}
    </div>
  );
};