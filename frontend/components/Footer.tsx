import React from 'react';
import Link from 'next/link';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white py-6 px-6 md:px-12">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div>
          <Link href="/">
            <a className="text-2xl font-bold">EXODUS</a>
          </Link>
        </div>
        <nav className="space-x-6 mt-4 md:mt-0">
          <Link href="/marketplace">
            <a className="hover:text-purple-500">Marketplace</a>
          </Link>
          <Link href="/dashboard">
            <a className="hover:text-purple-500">Dashboard</a>
          </Link>
          <Link href="/about">
            <a className="hover:text-purple-500">About</a>
          </Link>
        </nav>
      </div>
    </footer>
  );
};