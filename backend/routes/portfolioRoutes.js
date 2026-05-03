import { Router } from 'express';
import { getPortfolioProfile, updatePortfolioProfile } from '../controllers/portfolioController.js';

const router = Router();

router.get('/', getPortfolioProfile);
router.put('/', updatePortfolioProfile);

export default router;
