/* eslint-disable no-console */
import express from 'express';
import cors from 'cors';
// eslint-disable-next-line
import colors from 'colors';

import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import authRoutes from './src/services/auth/index.js';
import proRoutes from './src/services/pro/index.js';
import clientRoutes from './src/services/client/index.js';
import adminRoutes from './src/services/admin/index.js';
import externalRoutes from './src/services/externals/spotify/index.js';
import stripeRoutes from './src/services/externals/stripe/index.js';

dotenv.config();

const services = [
  { name: 'auth', routes: authRoutes },
  { name: 'spotify', routes: externalRoutes },
  { name: 'pro', routes: proRoutes },
  { name: 'admin', routes: adminRoutes },
  { name: 'client', routes: clientRoutes },
  { name: 'stripe', routes: stripeRoutes },
];

const app = express();
app.use(cors({
  exposedHeaders: ['X-hit'],
}));
app.use(express.json());
app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

services.forEach((service) => {
  app.use(`/api/${service.name}`, service.routes);
});

mongoose.connect(
  `mongodb+srv://besticks_admin:${process.env.DB_Password}@cluster0.jebs4.mongodb.net/besticks?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true },
)
  .then(() => console.log('[Besticks-database] Successfully connected mongo'.green))
  .catch(() => console.log('[Besticks-database] Failed to connect mongo'.red));

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`[Besticks-api] running on port ${port}`.green);
});
