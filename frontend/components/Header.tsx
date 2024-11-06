import React from 'react';
import Link from 'next/link';
import { useWeb3React } from '@web3-react/core';
import { WalletConnect } from './WalletConnect';

export const Header: React.FC = () => {
  const { account } = useWeb3React();

  return (
    <header className="bg-black text-white py-4 px-6 md:px-12 flex justify-between items-center">
      <Link href="/">
        <a className="text-2xl font-bold">EXODUS</a>
      </Link>
      <nav className="space-x-6">
        <Link href="/marketplace">
          <a className="hover:text-purple-500">Marketplace</a>
        </Link>
        <Link href="/dashboard">
          <a className="hover:text-purple-500">Dashboard</a>
        </Link>
        {account ? (
          <div>{account.substring(0, 6)}...{account.substring(38)}</div>
        ) : (
          <WalletConnect />
        )}
      </nav>
    </header>
  );
};
