import { asyncHandler } from '../middleware/asyncHandler.js';
import { getPortfolio, upsertPortfolio } from '../models/repositories.js';
import { portfolioSchema } from '../models/schemas.js';

export const getPortfolioProfile = asyncHandler(async (req, res) => {
  const portfolio = getPortfolio();
  res.json({ success: true, data: portfolio });
});

export const updatePortfolioProfile = asyncHandler(async (req, res) => {
  const parsed = portfolioSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ success: false, message: 'Validation failed', errors: parsed.error.flatten() });
  }

  const portfolio = upsertPortfolio(parsed.data);
  res.json({ success: true, data: portfolio, message: 'Portfolio updated successfully' });
});
