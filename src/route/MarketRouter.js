import { Router } from 'express';

import marketController from '../controller/MarketController';


const router = Router();

router.get('', marketController.getMarketplace);
router.post('', marketController.buy);

export default router;
