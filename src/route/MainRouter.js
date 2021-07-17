import { Router } from 'express';
import testRouter from './TestRouter';
import marketRouter from './MarketRouter';
import petRouter from './PetRouter';
import eventRouter from './EventRouter';

const router = Router();

/*
 * Routes for creating and testing mock and/or dummy data.
 */
router.use('/test', testRouter);

/*
 * Application specific routes.
 */
router.use('/api/market', marketRouter);
router.use('/api/pet', petRouter);
router.use('/api/event', eventRouter);

/**
 * Default route for all other API queries that are not specified.
 */
router.use('/api', (req, res) => {
  res.send(`
    <h2>Express API</h2>
    <p>
      You have reached the express API.
      Email rf.raymondfeng@gmail.com for any questions on usage.
    </p>
  `);
});

module.exports = router;
