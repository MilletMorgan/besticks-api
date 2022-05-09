import express from 'express';
import { createCheckoutSession, webhook } from './checkout.js';

const router = express.Router();

router.post('/create-checkout-session', createCheckoutSession);
router.post('/webhook', express.raw({ type: '*/*' }), webhook);

export default router;
