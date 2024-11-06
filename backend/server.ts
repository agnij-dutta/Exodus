import express from 'express';
import cors from 'cors';
import { listingsRouter } from './routes/listings';
import { transfersRouter } from './routes/transfers';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/listings', listingsRouter);
app.use('/api/transfers', transfersRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// backend/routes/listings.ts
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