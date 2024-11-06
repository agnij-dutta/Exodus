import React, { useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { InjectedConnector } from '@web3-react/injected-connector';

const injected = new InjectedConnector({
  supportedChainIds: [1, 43114, 1399811149] // Ethereum, Avalanche, Solana
});

export const WalletConnect: React.FC = () => {
  const { activate, account, deactivate } = useWeb3React();
  const [loading, setLoading] = useState(false);

  const connectWallet = async () => {
    try {
      setLoading(true);
      await activate(injected);
    } catch (error) {
      console.error('Error connecting wallet:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      {!account ? (
        <button
          onClick={connectWallet}
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {loading ? 'Connecting...' : 'Connect Wallet'}
        </button>
      ) : (
        <div>
          <p>Connected: {account.substring(0, 6)}...{account.substring(38)}</p>
          <button
            onClick={() => deactivate()}
            className="bg-red-500 text-white px-4 py-2 rounded mt-2"
          >
            Disconnect
          </button>
        </div>
      )}
    </div>
  );
};