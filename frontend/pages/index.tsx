import React from 'react';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { Features } from '../components/Features';
import { About } from '../components/About';
import { CallToAction } from '../components/CallToAction';
import { Footer } from '../components/Footer';

const HomePage = () => {
  return (
    <div className="bg-white text-black">
      <Header />
      <Hero />
      <Features />
      <About />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default HomePage;