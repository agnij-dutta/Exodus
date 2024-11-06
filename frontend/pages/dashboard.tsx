import React from 'react';
import { Header } from '../components/Header';
import { UserNFTs } from '../components/UserNFTs';
import { TransferHistory } from '../components/TransferHistory';
import { Footer } from '../components/Footer';

const DashboardPage = () => {
  return (
    <div className="bg-white text-black">
      <Header />
      <div className="py-12 px-6 md:px-12">
        <h1 className="text-4xl font-bold mb-8">Dashboard</h1>
        <UserNFTs />
        <TransferHistory />
      </div>
      <Footer />
    </div>
  );
};

export default DashboardPage;