import mongoose from 'mongoose';

const ListingSchema = new mongoose.Schema({
  nftContract: String,
  tokenId: String,
  price: String,
  seller: String,
  sourceChain: String,
  targetChain: String,
  status: {
    type: String,
    enum: ['active', 'sold', 'cancelled'],
    default: 'active'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const Listing = mongoose.model('Listing', ListingSchema);