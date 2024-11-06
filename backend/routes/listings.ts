import { Router } from 'express';
import { Listing } from '../models/Listing';

const router = Router();

router.post('/create', async (req, res) => {
  try {
    const {
      nftContract,
      tokenId,
      price,
      seller,
      sourceChain,
      targetChain
    } = req.body;

    const listing = await Listing.create({
      nftContract,
      tokenId,
      price,
      seller,
      sourceChain,
      targetChain,
      status: 'active'
    });

    res.json(listing);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create listing' });
  }
});

router.get('/', async (req, res) => {
  try {
    const listings = await Listing.find({ status: 'active' });
    res.json(listings);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch listings' });
  }
});

export const listingsRouter = router;