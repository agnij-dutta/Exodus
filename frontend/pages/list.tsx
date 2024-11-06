import React from 'react';
import { Header } from '../components/Header';
import { ListingForm } from '../components/ListingForm';
import { Footer } from '../components/Footer';

const ListNFTPage = () => {
  return (
    <div className="bg-white text-gray-900 font-inter">
      <Header />
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8">List NFT</h1>
          <ListingForm />
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ListNFTPage;