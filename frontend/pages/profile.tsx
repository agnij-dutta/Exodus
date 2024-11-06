import React from 'react';
import { Header } from '../components/Header';
import { TransferProgress } from '../components/TransferProgress';
import { Footer } from '../components/Footer';

const ProfilePage = () => {
  return (
    <div className="bg-white text-gray-900 font-inter">
      <Header />
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8">Profile</h1>
          <TransferProgress transferId="123456" />
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ProfilePage;