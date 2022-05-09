import express from 'express';

import adminMiddleware from '../../core/middlewares/adminMiddleware.js';

import {
  flushCache,
} from './tools.js';

const router = express.Router();

router.post('/cache', adminMiddleware, flushCache);

export default router;
