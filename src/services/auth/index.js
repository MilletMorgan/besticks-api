import express from 'express';

import {
  login,
  signup,
  generatePrivateKey,
  generateAccessToken,
} from './auth.js';

const router = express.Router();

router.post('/login', login);
router.post('/signup', signup);
router.post('/generatePk', generatePrivateKey);
router.post('/generateAt', generateAccessToken);

export default router;
