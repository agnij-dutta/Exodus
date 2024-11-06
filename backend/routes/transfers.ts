import { Router } from 'express';
import { WormholeClient } from '../utils/wormhole';

const router = Router();
const wormhole = new WormholeClient();

router.post('/initiate', async (req, res) => {
  try {
    const {
      sourceChain,
      targetChain,
      tokenId,
      tokenAddress,
      recipient
    } = req.body;

    const transfer = await wormhole.transferNFT(
      sourceChain,
      targetChain,
      tokenId,
      tokenAddress,
      recipient
    );

    res.json(transfer);
  } catch (error) {
    res.status(500).json({ error: 'Transfer failed' });
  }
});

router.get('/status/:transferId', async (req, res) => {
  try {
    const status = await wormhole.getTransferStatus(req.params.transferId);
    res.json({ status });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch transfer status' });
  }
});

export const transfersRouter = router;
