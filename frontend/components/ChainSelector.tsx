import React from 'react';

const chains = [
  { id: 1, name: 'Ethereum', symbol: 'ETH' },
  { id: 43114, name: 'Avalanche', symbol: 'AVAX' },
  { id: 1399811149, name: 'Solana', symbol: 'SOL' }
];

interface ChainSelectorProps {
  value: number;
  onChange: (chainId: number) => void;
}

export const ChainSelector: React.FC<ChainSelectorProps> = ({
  value,
  onChange
}) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="p-2 border rounded"
    >
      {chains.map((chain) => (
        <option key={chain.id} value={chain.id}>
          {chain.name} ({chain.symbol})
        </option>
      ))}
    </select>
  );
};