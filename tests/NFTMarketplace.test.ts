import { expect } from 'chai';
import { ethers } from 'hardhat';
import { NFTMarketplace } from '../typechain/NFTMarketplace';

describe('NFTMarketplace', () => {
  let marketplace: NFTMarketplace;
  let owner: any;
  let addr1: any;
  let addr2: any;

  beforeEach(async () => {
    const NFTMarketplace = await ethers.getContractFactory('NFTMarketplace');
    [owner, addr1, addr2] = await ethers.getSigners();
    marketplace = await NFTMarketplace.deploy();
    await marketplace.deployed();
  });

  describe('Listing', () => {
    it('should create a new listing', async () => {
      const tx = await marketplace.listNFT(
        addr1.address,
        1,
        ethers.utils.parseEther('1'),
        'solana'
      );
      await tx.wait();

      const listing = await marketplace.listings(1);
      expect(listing.seller).to.equal(addr1.address);
      expect(listing.price).to.equal(ethers.utils.parseEther('1'));
      expect(listing.isActive).to.be.true;
    });

    it('should prevent listing with invalid price', async () => {
      await expect(
        marketplace.listNFT(addr1.address, 1, 0, 'solana')
      ).to.be.revertedWith('Invalid price');
    });
  });

  describe('Buying', () => {
    beforeEach(async () => {
      await marketplace.connect(addr1).listNFT(
        addr1.address,
        1,
        ethers.utils.parseEther('1'),
        'solana'
      );
    });

    it('should allow buying listed NFT', async () => {
      await marketplace.connect(addr2).buyNFT(1, {
        value: ethers.utils.parseEther('1')
      });

      const listing = await marketplace.listings(1);
      expect(listing.isActive).to.be.false;
    });

    it('should transfer NFT and payment correctly', async () => {
      const initialBalance = await addr1.getBalance();
      
      await marketplace.connect(addr2).buyNFT(1, {
        value: ethers.utils.parseEther('1')
      });

      const finalBalance = await addr1.getBalance();
      expect(finalBalance.sub(initialBalance)).to.equal(
        ethers.utils.parseEther('1')
      );
    });
  });
});
